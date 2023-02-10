import { SequelizeModule } from '@nestjs/sequelize';
import { SheduleController } from './shedule.controller';
import { SheduleService } from './shedule.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { Pokazania } from 'src/pokazania/models/pokazania.model';
import { Users } from 'src/getPass/models/user.model';
import { Rates } from 'src/pokazania/models/rates.model';
import { Debts } from 'src/pokazania/models/debts.model';
import { Payment } from 'src/pokazania/models/payments.model';
import { Uchastki } from 'src/getPass/models/uchastki.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Users,
      Pokazania,
      Rates,
      Debts,
      Payment,
      Uchastki,
    ]),
  ],
  controllers: [SheduleController],
  providers: [SheduleService],
})
export class SheduleModule {}
