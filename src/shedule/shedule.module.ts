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
import { DebtService } from 'src/pokazania/debt.service';
import { LoggerModule } from 'src/logger/logger.module';
import { LoggerService } from 'src/logger/logger.service';
import { PokazaniaService } from 'src/pokazania/pokazania.service';
import { GetPassService } from 'src/getPass/get-pass.service';
import { Role } from 'src/roles/roles/models/roles.model';
import { RolesService } from 'src/roles/roles/roles.service';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Users,
      Pokazania,
      Rates,
      Debts,
      Payment,
      Uchastki,
      Role,
    ]),
  ],
  controllers: [SheduleController],
  providers: [
    SheduleService,
    DebtService,
    PokazaniaService,
    GetPassService,
    RolesService,
  ],
})
export class SheduleModule {}
