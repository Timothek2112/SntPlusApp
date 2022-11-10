/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { GetUserDto } from 'src/getPass/dto/get-user.dto';
import { User } from 'src/getPass/models/user.model';
import { DebtDto } from './dto/create-debt.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CreateRateDto } from './dto/create-rate.dto';
import { Debts } from './models/debts.model';
import { Pokazania } from './models/pokazania.model';
import { Rates } from './models/rates.model';

@Injectable()
export class DebtService {
  constructor(
    @InjectModel(Rates) private ratesRepository: typeof Rates,
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Debts) private debtRepository: typeof Debts,
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

  async returnDebt(dto: GetUserDto) {
    if (await this.isLastDebtActual(dto)) {
      const user = await this.userRepository.findOne({
        where: { id: dto.userid },
        include: { all: true },
      });
      console.log(user);
      const debt = user.debts[user.debts.length - 1];
      return debt;
    } else {
      return await this.calculateNewDebt(dto);
    }
  }

  async isLastDebtActual(dto: GetUserDto) {
    const user = await this.userRepository.findOne({
      where: { id: dto.userid },
      include: { all: true },
    });

    const lastActualPokazanieId = user.pokazania[user.pokazania.length - 1].id;
    const lastPokazanie = this.findPokazaniaInDebts(
      user.debts,
      lastActualPokazanieId,
    );

    console.log(lastPokazanie);
    if (lastPokazanie != null) {
      return true;
    } else {
      console.log('false');
      return false;
    }
  }

  findPokazaniaInDebts(arr: Debts[], target: number) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].lastPokazanieId == target) {
        return arr[i];
      }
    }
    return null;
  }

  async calculateNewDebt(dto: GetUserDto) {
    const user = await this.userRepository.findOne({
      where: { id: dto.userid },
      include: { all: true },
    });

    const payments = this.calculatePaymentSum(user);
    const calculatedDebt: DebtDto = await this.calculateDebts(user);
    calculatedDebt.applyPayment(payments);

    const newDebt = await this.debtRepository.create(calculatedDebt);
    await user.$add('debts', [newDebt.id]);
    user.debts.push(newDebt);

    return newDebt;
  }

  calculatePaymentSum(user: User) {
    const payments = user.payments;
    const sumPayment: CreatePaymentDto = new CreatePaymentDto();

    sumPayment.water = 0;
    sumPayment.electricity = 0;
    sumPayment.membership = 0;
    sumPayment.penality = 0;

    for (let i = 0; i < payments.length; i++) {
      sumPayment.water += payments[i].water;
      sumPayment.electricity += payments[i].electricity;
      sumPayment.membership += payments[i].membership;
      sumPayment.penality += payments[i].penality;
    }

    return sumPayment;
  }

  async calculateDebts(user: User) {
    const userPokazania = user.pokazania;
    let rate = await this.findRate(userPokazania);
    const calculatedDebt = new DebtDto();

    // eslint-disable-next-line prettier/prettier
    calculatedDebt.electricity = userPokazania[0].electricity * rate.electricity;
    calculatedDebt.water = userPokazania[0].water * rate.water;
    calculatedDebt.membership = userPokazania[0].membership;
    calculatedDebt.penality = 0;

    for (let i = 1; i < userPokazania.length; i++) {
      rate = await this.findRate(userPokazania);

      const actual = userPokazania[i];
      const last = userPokazania[i - 1];

      calculatedDebt.water += (actual.water - last.water) * rate.water;
      // eslint-disable-next-line prettier/prettier
      calculatedDebt.electricity += (actual.electricity - last.electricity) * rate.electricity;
      calculatedDebt.membership += actual.membership;
    }

    for (let i = 0; i < user.debts.length; i++) {
      calculatedDebt.penality += user.debts[i].penality;
    }

    return calculatedDebt;
  }

  async findRate(userPokazania: Pokazania[]) {
    return await this.ratesRepository.findOne({
      where: {
        month: { [Op.lte]: userPokazania[0].month },
        year: { [Op.lte]: userPokazania[0].year },
      },
      order: [['id', 'DESC']],
    });
  }
}
