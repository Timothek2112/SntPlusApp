/* eslint-disable @typescript-eslint/no-unused-vars */
/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, QueryTypes, Transaction } from 'sequelize';
import { getUchastokDto } from 'src/getPass/dto/get-uchastok.dto';
import { Uchastki } from 'src/getPass/models/uchastki.model';
import { Users } from 'src/getPass/models/user.model';
import { DebtDto } from './dto/create-debt.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CreateRateDto } from './dto/create-rate.dto';
import { PeriodDto } from './dto/period.dto';
import { Debts } from './models/debts.model';
import { Payment } from './models/payments.model';
import { Pokazania } from './models/pokazania.model';
import { Rates } from './models/rates.model';
import { sign } from 'crypto';

@Injectable()
export class DebtService {
  constructor(
    @InjectModel(Rates) private ratesRepository: typeof Rates,
    @InjectModel(Users) private userRepository: typeof Users,
    @InjectModel(Debts) private debtRepository: typeof Debts,
    @InjectModel(Pokazania) private pokazaniaRepository: typeof Pokazania,
    @InjectModel(Payment) private paymentsRepository: typeof Payment,
    @InjectModel(Uchastki) private uchastkiRepository: typeof Uchastki,
  ) {
    Pokazania.addHook('afterCreate', (pokazanie: Pokazania, options) => {
      const dto = new getUchastokDto(pokazanie.uchastokId, pokazanie.SntId);
      this.calculateNewDebt(dto);
    });

    Pokazania.addHook('afterUpdate', (pokazanie: Pokazania, options) => {
      const dto = new getUchastokDto(pokazanie.uchastokId, pokazanie.SntId);
      this.calculateNewDebt(dto);
    });

    Payment.addHook('afterUpdate', (payment: Payment, options) => {
      const dto = new getUchastokDto(payment.uchastokId, payment.SntId);
      this.calculateNewDebt(dto);
    });

    Payment.addHook('afterCreate', (payment: Payment, options) => {
      const dto = new getUchastokDto(payment.uchastokId, payment.SntId);
      this.calculateNewDebt(dto);
    });
  }

  async createRate(dto: CreateRateDto) {
    let rate = null;
    const month = dto.month;
    const year = dto.year;
    const dublicatedRate = await this.ratesRepository.findOne({
      where: { month: month, year: year, SntId: dto.SntId },
      include: { all: true },
    });

    if (dublicatedRate) {
      await this.ratesRepository.update(dto, {
        where: { month, year, SntId: dto.SntId },
      });
      return dublicatedRate;
    } else {
      rate = await this.ratesRepository.create(dto);
      return rate;
    }
  }

  async returnDebt(dto: getUchastokDto) {
    const uchastok = await this.uchastkiRepository.findOne({
      where: { id: dto.uchastokId, SntId: dto.SntId },
      include: { all: true },
    });

    return uchastok.debt;
  }

  //считает сколько пользователь должен на данный момент
  public async calculateNewDebt(dto: getUchastokDto) {
    const uchastok = await this.uchastkiRepository.findOne({
      where: { id: dto.uchastokId, SntId: dto.SntId },
      include: { all: true },
    });

    if (!uchastok) return { error: 'Участка не существует' };

    const payments = this.calculatePaymentSum(uchastok);
    const calculatedDebt = await this.calculateDebt(
      uchastok.id,
      uchastok.SntId,
    );

    if ('error' in calculatedDebt) return payments;
    if (!('error' in payments)) calculatedDebt.applyPayment(payments);

    if (uchastok.debt != null) await uchastok.debt.destroy();

    const newDebt = await this.debtRepository.create(calculatedDebt);
    await uchastok.$set('debt', [newDebt.id]);

    return newDebt;
  }

  //считает всю сумму оплаченную пользователем
  calculatePaymentSum(uchastok: Uchastki) {
    const payments = uchastok.payments;
    const sumPayment: CreatePaymentDto = new CreatePaymentDto();
    sumPayment.zeros();

    if (payments.length == 0) return { error: 'Нет ни одной оплаты' };

    for (let i = 0; i < payments.length; i++) {
      sumPayment.water += payments[i].water;
      sumPayment.electricity += payments[i].electricity;
      sumPayment.membership += payments[i].membership;
      sumPayment.penality += payments[i].penality;
      sumPayment.target += payments[i].target;
    }

    return sumPayment;
  }

  //считает весь долг пользователя
  async calculateDebt(uchastokId: number, SntId: number) {
    const pokazania = await this.pokazaniaRepository.findAll({
      where: { uchastokId: uchastokId, SntId: SntId },
      order: [
        ['year', 'ASC'],
        ['month', 'ASC'],
      ],
    });

    if (pokazania.length == 0) return { error: 'Показаний нет' };

    const debt: DebtDto = new DebtDto();
    let rate: Rates = await this.findRate(pokazania[0]);

    debt.water = pokazania[0].water * rate.water;
    debt.electricity = pokazania[0].electricity * rate.electricity;
    debt.membership = pokazania[0].membership;
    debt.target = pokazania[0].target;
    debt.penality = pokazania[0].penality;

    for (let i = 1; i < pokazania.length; i++) {
      rate = await this.findRate(pokazania[i]);
      const prevWater = pokazania[i - 1];
      const prevElectricity = pokazania[i - 1];

      // eslint-disable-next-line prettier/prettier
      if (prevWater.water > pokazania[i].water) debt.water += pokazania[i].water * rate.water;
      else debt.water += (pokazania[i].water - prevWater.water) * rate.water;

      if (prevElectricity.electricity > pokazania[i].electricity)
        debt.electricity += pokazania[i].electricity * rate.electricity;
      else
        debt.electricity +=
          (pokazania[i].electricity - prevElectricity.electricity) *
          rate.electricity;

      debt.membership += pokazania[i].membership;
      debt.target += pokazania[i].target;
      debt.penality += pokazania[i].penality;
    }

    debt.SntId = SntId;
    debt.uchastokId = uchastokId;

    return debt;
  }

  //Находит тариф, по которому следует считать переданное показание
  async findRate(userPokazania: Pokazania | Payment) {
    let foundRate = null;

    await this.ratesRepository
      .findAll({
        where: {
          SntId: userPokazania.SntId,
        },
        order: [
          ['year', 'ASC'],
          ['month', 'ASC'],
        ],
      })
      .then((result) => {
        result.forEach((rate) => {
          if (
            userPokazania.year * 100 + userPokazania.month >=
            rate.year * 100 + rate.month
          ) {
            foundRate = rate;
          }
        });
        return null;
      });

    return foundRate;
  }

  //Возвращает показания или оплаты за заданный период
  async returnForPeriod(dto: PeriodDto, switchState: string) {
    let req;
    let userForPeriod = [];

    const result = [];

    if (switchState == 'Pokazania') {
      req = await this.pokazaniaRepository.findAll({
        where: {
          uchastokId: dto.uchastokId,
          SntId: dto.SntId,
        },
        include: { all: true },
        order: [
          ['year', 'ASC'],
          ['month', 'ASC'],
        ],
      });
    } else if (switchState == 'Payments') {
      req = await this.paymentsRepository.findAll({
        where: {
          uchastokId: dto.uchastokId,
          SntId: dto.SntId,
        },
        include: { all: true },
      });
    }

    userForPeriod = this.getForPeriod(
      dto.startPeriodM,
      dto.endPeriodM,
      dto.startPeriodY,
      dto.endPeriodY,
      req,
    );

    for (let i = 0; i < userForPeriod.length; i++) {
      const unit = userForPeriod[i];
      result.push({
        water: unit.water,
        electricity: unit.electricity,
        penality: unit.penality,
        membership: unit.membership,
        target: unit.target,
        month: unit.month,
        year: unit.year,
      });
    }
    return result;
  }

  //Возвращает ставки за период
  async getRatesForPeriod(dto: PeriodDto) {
    const rates = await this.ratesRepository.findAll({
      where: { SntId: dto.SntId },
    });
    return this.getForPeriod(
      dto.startPeriodM,
      dto.endPeriodM,
      dto.startPeriodY,
      dto.endPeriodY,
      rates,
    );
  }

  //Возвращает записи переданного массива за заданный период
  getForPeriod(startPeriodM, endPeriodM, startPeriodY, endPeriodY, req) {
    const forPeriod = [];
    for (let i = 0; i < req.length; i++) {
      if (
        startPeriodY * 100 + startPeriodM <=
        req[i].year * 100 + req[i].month
      ) {
        if (endPeriodY * 100 + endPeriodM >= req[i].year * 100 + req[i].month) {
          forPeriod.push(req[i]);
        }
      }
    }
    return forPeriod;
  }

  async CalculateDebtForPeriod(dto: PeriodDto) {
    const uchastok = await this.uchastkiRepository.findOne({
      where: { id: dto.uchastokId, SntId: dto.SntId },
      include: { all: true },
    });

    if (!uchastok)
      throw new Error('Участка не существует  id = ' + dto.uchastokId);

    const payments = await this.CalculatePaymentForPeriod(dto);
    const calculatedDebt = await this.CalculatePokazaniaForPeriod(dto);

    if ('error' in calculatedDebt) throw new Error('Нет показаний');
    if (!('error' in payments)) calculatedDebt.applyPayment(payments);

    return calculatedDebt;
  }

  async CalculatePokazaniaForPeriod(period: PeriodDto) {
    const allPokazania = await this.pokazaniaRepository.findAll({
      where: { uchastokId: period.uchastokId, SntId: period.SntId },
      include: { all: true },
    });

    const pokazania = this.getForPeriod(
      period.startPeriodM,
      period.endPeriodM,
      period.startPeriodY,
      period.endPeriodY,
      allPokazania,
    );

    if (pokazania.length == 0) return { error: 'Показаний нет' };

    const debt: DebtDto = new DebtDto();
    let rate: Rates = await this.findRate(pokazania[0]);

    debt.water = pokazania[0].water * rate.water;
    debt.electricity = pokazania[0].electricity * rate.electricity;
    debt.membership = pokazania[0].membership;
    debt.target = pokazania[0].target;
    debt.penality = pokazania[0].penality;
    for (let i = 1; i < pokazania.length; i++) {
      rate = await this.findRate(pokazania[i]);
      const prevWater = pokazania[i - 1];
      const prevElectricity = pokazania[i - 1];

      // eslint-disable-next-line prettier/prettier
      if (prevWater.water > pokazania[i].water) debt.water += pokazania[i].water * rate.water;
      else debt.water += (pokazania[i].water - prevWater.water) * rate.water;

      if (prevElectricity.electricity > pokazania[i].electricity)
        debt.electricity += pokazania[i].electricity * rate.electricity;
      else
        debt.electricity +=
          (pokazania[i].electricity - prevElectricity.electricity) *
          rate.electricity;

      debt.membership += pokazania[i].membership;
      debt.target += pokazania[i].target;
      debt.penality += pokazania[i].penality;
    }

    debt.SntId = period.SntId;
    debt.uchastokId = period.uchastokId;

    return debt;
  }

  async CalculatePaymentForPeriod(period: PeriodDto) {
    const allPayments = await this.paymentsRepository.findAll({
      where: { uchastokId: period.uchastokId, SntId: period.SntId },
      include: { all: true },
    });
    const payments = this.getForPeriod(
      period.startPeriodM,
      period.endPeriodM,
      period.startPeriodY,
      period.endPeriodY,
      allPayments,
    );
    const sumPayment: CreatePaymentDto = new CreatePaymentDto();
    sumPayment.zeros();

    if (payments.length == 0) return { error: 'Нет ни одной оплаты' };

    for (let i = 0; i < payments.length; i++) {
      sumPayment.water += payments[i].water;
      sumPayment.electricity += payments[i].electricity;
      sumPayment.membership += payments[i].membership;
      sumPayment.penality += payments[i].penality;
      sumPayment.target += payments[i].target;
    }

    return sumPayment;
  }
}
