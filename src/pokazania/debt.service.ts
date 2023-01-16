/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { from } from 'rxjs';
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

@Injectable()
export class DebtService {
  constructor(
    @InjectModel(Rates) private ratesRepository: typeof Rates,
    @InjectModel(Users) private userRepository: typeof Users,
    @InjectModel(Debts) private debtRepository: typeof Debts,
    @InjectModel(Pokazania) private pokazaniaRepository: typeof Pokazania,
    @InjectModel(Payment) private paymentsRepository: typeof Payment,
    @InjectModel(Uchastki) private uchastkiRepository: typeof Uchastki,
  ) {}

  async createRate(dto: CreateRateDto) {
    let rate = null;
    const month = dto.month;
    const year = dto.year;
    const dublicatedRate = await this.ratesRepository.findOne({
      where: { month: month, year: year },
      include: { all: true },
    });

    if (dublicatedRate) {
      await this.ratesRepository.update(dto, { where: { month, year } });
      return dublicatedRate;
    } else {
      rate = await this.ratesRepository.create(dto);
      return rate;
    }
  }

  async returnDebt(dto: getUchastokDto) {
    const uchastok = await this.uchastkiRepository.findOne({
      where: { uchastok: dto.uchastokId },
      include: { all: true },
    });
    const debt = uchastok.debts[uchastok.debts.length - 1];
    return debt;
  }

  //считает сколько пользователь должен на данный момент
  public async calculateNewDebt(dto: getUchastokDto) {
    const uchastok = await this.uchastkiRepository.findOne({
      where: { uchastok: dto.uchastokId },
      include: { all: true },
    });

    if (!uchastok) return { error: 'Участка не существует' };

    const payments = this.calculatePaymentSum(uchastok);
    const calculatedDebt = await this.calculateDebt(uchastok.uchastok);

    if ('error' in calculatedDebt) return calculatedDebt;

    calculatedDebt.applyPayment(payments);

    const newDebt = await this.debtRepository.create(calculatedDebt);
    await uchastok.$add('debts', [newDebt.id]);
    uchastok.debts.push(newDebt);

    return newDebt;
  }

  //считает всю сумму оплаченную пользователем
  calculatePaymentSum(uchastok: Uchastki) {
    const payments = uchastok.payments;
    const sumPayment: CreatePaymentDto = new CreatePaymentDto();

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
  async calculateDebt(uchastok: number) {
    const pokazania = await this.pokazaniaRepository.findAll({
      where: { uchastokId: uchastok },
      order: [
        ['year', 'ASC'],
        ['month', 'ASC'],
      ],
    });
    const debt: DebtDto = new DebtDto();
    let rate = await this.findRate(pokazania[0]);
    debt.water = pokazania[0].water * rate.water;
    debt.electricity = pokazania[0].electricity * rate.electricity;
    debt.membership = pokazania[0].membership;
    debt.target = pokazania[0].target;
    debt.penality = pokazania[0].penality;
    for (let i = 1; i < pokazania.length; i++) {
      rate = await this.findRate(pokazania[i]);
      const prevWater = pokazania[i - 1];
      const prevElectricity = pokazania[i - 1];
      debt.water += (pokazania[i].water - prevWater.water) * rate.water;
      debt.electricity +=
        (pokazania[i].electricity - prevElectricity.electricity) *
        rate.electricity;
      debt.membership += pokazania[i].membership;
      debt.target += pokazania[i].target;
      debt.penality += pokazania[i].penality;
    }
    return debt;
  }

  //Находит тариф, по которому следует считать переданное показание
  async findRate(userPokazania: Pokazania | Payment) {
    const allRates = await this.ratesRepository.findAll({
      order: [
        ['year', 'ASC'],
        ['month', 'ASC'],
      ],
    });

    for (let i = 0; i < allRates.length; i++) {
      if (
        userPokazania.year * 100 + userPokazania.month >=
        allRates[i].year * 100 + allRates[i].month
      ) {
        return allRates[i];
      }
    }
    return null;
  }

  //Возвращает показания или оплаты за заданный период
  async returnForPeriod(dto: PeriodDto, switchState: string) {
    const uchastok = await this.uchastkiRepository.findOne({
      where: { uchastok: dto.uchastokId },
      include: { all: true },
    });
    let req;
    let userForPeriod = [];

    const result = [];

    if (switchState == 'Pokazania') {
      req = await this.pokazaniaRepository.findAll({
        where: {
          uchastokId: dto.uchastokId,
        },
        include: { all: true },
        order: [
          ['year', 'ASC'],
          ['month', 'ASC'],
        ],
      });
      console.log('Считаем показания');
    } else if (switchState == 'Payments') {
      req = await this.paymentsRepository.findAll({
        where: {
          uchastokId: dto.uchastokId,
        },
        include: { all: true },
      });
      console.log('Считаем оплаты');
    }

    userForPeriod = this.getForPeriod(
      dto.startPeriodM,
      dto.endPeriodM,
      dto.startPeriodY,
      dto.endPeriodY,
      req,
    );

    const rates: Rates[] = await this.getRatesForPeriod(dto);

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
    const rates = await this.ratesRepository.findAll();
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
}
