/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GetPassService } from '../getPass/get-pass.service';
import { Users } from '../getPass/models/user.model';
import { CreatePokazanieDto } from './dto/create-pokazanie.dto';
import { Payment } from './models/payments.model';
import { Pokazania } from './models/pokazania.model';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { DebtService } from './debt.service';
import { GetUserDto } from 'src/getPass/dto/get-user.dto';
import { Uchastki } from 'src/getPass/models/uchastki.model';
import { getUchastokDto } from 'src/getPass/dto/get-uchastok.dto';

@Injectable()
export class PokazaniaService {
  constructor(
    @InjectModel(Pokazania) private pokazania: typeof Pokazania,
    @InjectModel(Users) private userRepository: typeof Users,
    @InjectModel(Payment) private paymentRepository: typeof Payment,
    @InjectModel(Uchastki) private uchastkiRepository: typeof Uchastki,
    private userService: GetPassService,
    private debtService: DebtService,
  ) {}

  async createPokazanie(dto: CreatePokazanieDto) {
    const uchastok = await this.uchastkiRepository.findOne({
      where: { uchastok: dto.uchastokId },
    });

    const dublicatePokazanie = await this.pokazania.findOne({
      where: {
        month: dto.month,
        year: dto.year,
        uchastokId: uchastok.uchastok,
      },
    });
    if (dublicatePokazanie) {
      await this.pokazania.update(dto, {
        where: {
          month: dto.month,
          year: dto.year,
          uchastokId: uchastok.uchastok,
        },
      });

      const uchastokDto: getUchastokDto = new getUchastokDto();
      uchastokDto.uchastokId = uchastok.uchastok;
      await this.debtService.calculateNewDebt(uchastokDto);

      return dto;
    } else {
      const pokazanieDto = new CreatePokazanieDto();
      pokazanieDto.create(dto);
      const pokazanie = await this.pokazania.create(dto);
      await uchastok.$add('pokazania', [pokazanie.id]);
      const uchastokDto: getUchastokDto = new getUchastokDto();
      uchastokDto.uchastokId = dto.uchastokId;
      await this.debtService.calculateNewDebt(uchastokDto);

      return pokazanie;
    }
  }

  async createPayment(dto: CreatePaymentDto) {
    const uchastok = await this.uchastkiRepository.findOne({
      where: { uchastok: dto.uchastokId },
      include: { all: true },
    });
    const dublicatePayment = await this.paymentRepository.findOne({
      where: {
        month: dto.month,
        year: dto.year,
        uchastokId: uchastok.uchastok,
      },
    });

    if (dublicatePayment) {
      await this.paymentRepository.update(dto, {
        where: {
          month: dto.month,
          year: dto.year,
          uchastokId: uchastok.uchastok,
        },
      });

      const uchastokDto: getUchastokDto = new getUchastokDto();
      uchastokDto.uchastokId = dto.uchastokId;
      await this.debtService.calculateNewDebt(uchastokDto);

      return dublicatePayment;
    } else {
      const payment = await this.paymentRepository.create(dto);
      await uchastok.$add('payments', [payment.id]);
      uchastok.payments.push(payment);

      const uchastokDto: getUchastokDto = new getUchastokDto();
      uchastokDto.uchastokId = dto.uchastokId;
      await this.debtService.calculateNewDebt(uchastokDto);

      return payment;
    }
  }
}
