/* eslint-disable prettier/prettier */
import { PokazaniaService } from './pokazania.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PokazaniaController } from './pokazania.controller';
import { Pokazania } from './models/pokazania.model';
import { PokazaniaUser } from './models/Pokazania_User.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../getPass/models/user.model';
import { GetPassModule } from '../getPass/get-pass.module';
import { Rates } from './models/rates.model';
import { Debts } from './models/debts.model';
import { Payment } from './models/payments.model';
import { PaymentsUser } from './models/Payments_User.model';
import { DebtService } from './debt.service';

@Module({
  controllers: [PokazaniaController],
  providers: [PokazaniaService, DebtService],
  imports: [
    SequelizeModule.forFeature([User, Pokazania, PokazaniaUser, Rates, Debts, Payment, PaymentsUser]),
    GetPassModule,
  ],
  exports: [PokazaniaService, DebtService],
})
export class PokazaniaModule {}
