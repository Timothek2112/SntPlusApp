/* eslint-disable prettier/prettier */
import { PokazaniaService } from './pokazania.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PokazaniaController } from './pokazania.controller';
import { Pokazania } from './models/pokazania.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from '../getPass/models/user.model';
import { GetPassModule } from '../getPass/get-pass.module';
import { Rates } from './models/rates.model';
import { Debts } from './models/debts.model';
import { Payment } from './models/payments.model';
import { DebtService } from './debt.service';
import { Uchastki } from 'src/getPass/models/uchastki.model';

@Module({
  controllers: [PokazaniaController],
  providers: [PokazaniaService, DebtService],
  imports: [
    SequelizeModule.forFeature([Users, Pokazania, Rates, Debts, Payment, Uchastki]),
    GetPassModule,
  ],
  exports: [PokazaniaService, DebtService],
})
export class PokazaniaModule {}
