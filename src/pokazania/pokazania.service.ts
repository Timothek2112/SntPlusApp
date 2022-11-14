/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GetPassService } from '../getPass/get-pass.service';
import { User } from '../getPass/models/user.model';
import { CreatePokazanieDto } from './dto/create-pokazanie.dto';
import { Payment } from './models/payments.model';
import { Pokazania } from './models/pokazania.model';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { DebtService } from './debt.service';
import { CreateUserDto } from 'src/getPass/dto/create-user.dto';
import { GetUserDto } from 'src/getPass/dto/get-user.dto';

@Injectable()
export class PokazaniaService {
  constructor(
    @InjectModel(Pokazania) private pokazania: typeof Pokazania,
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Payment) private paymentRepository: typeof Payment,
    private userService: GetPassService,
    private debtService: DebtService,
  ) {}

  async createPokazanie(dto: CreatePokazanieDto) {
    const id = dto.userid;
    const user = await this.userService.getUserById(id);

    const dublicatePokazanie = await this.pokazania.findOne({
      where: { month: dto.month, year: dto.year, userId: user.id },
    });
    //TODO: Дополнить поиск дубликантов оплаты как выше с показаниями
    if (dublicatePokazanie) {
      await this.pokazania.update(dto, {
        where: { month: dto.month, year: dto.year },
      });

      const userDto: GetUserDto = new GetUserDto();
      userDto.userid = id;
      await this.debtService.calculateNewDebt(userDto);

      return dto;
    } else {
      const pokazanie = await this.pokazania.create(dto);
      await user.$add('pokazania', [pokazanie.id]);
      user.pokazania.push(pokazanie);
      //await pokazanie.$add('user', [user]);
      return pokazanie;
    }
  }

  async createPayment(dto: CreatePaymentDto) {
    const user = await this.userRepository.findOne({
      where: { id: dto.userId },
      include: { all: true },
    });
    const dublicatePayment = await this.paymentRepository.findOne({
      where: { month: dto.month, year: dto.year },
    });

    if (dublicatePayment) {
      await this.paymentRepository.update(dto, {
        where: { month: dto.month, year: dto.year },
      });

      const userDto: GetUserDto = new GetUserDto();
      userDto.userid = dto.userId;
      await this.debtService.calculateNewDebt(userDto);

      return dublicatePayment;
    } else {
      const payment = await this.paymentRepository.create(dto);
      await user.$add('payments', [payment.id]);
      user.payments.push(payment);
      return payment;
    }
  }
}
