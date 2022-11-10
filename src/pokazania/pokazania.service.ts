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

@Injectable()
export class PokazaniaService {
  constructor(
    @InjectModel(Pokazania) private pokazania: typeof Pokazania,
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Payment) private paymentRepository: typeof Payment,
    private userService: GetPassService,
  ) {}

  async createPokazanie(dto: CreatePokazanieDto) {
    const id = dto.userid;
    const user = await this.userService.getUserById(id);
    const pokazanie = await this.pokazania.create(dto);
    await user.$add('pokazania', [pokazanie.id]);
    user.pokazania.push(pokazanie);

    return pokazanie;
  }

  async createPayment(dto: CreatePaymentDto) {
    const user = await this.userRepository.findOne({
      where: { id: dto.userId },
      include: { all: true },
    });
    const payment = await this.paymentRepository.create(dto);
    await user.$add('payments', [payment.id]);
    user.payments.push(payment);

    return payment;
  }
}
