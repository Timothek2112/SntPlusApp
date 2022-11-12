import { ExcelService } from './excel.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ExcelController } from './excel.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/getPass/models/user.model';
import { Payment } from 'src/pokazania/models/payments.model';
import { Pokazania } from 'src/pokazania/models/pokazania.model';

@Module({
  providers: [ExcelService],
  imports: [SequelizeModule.forFeature([User, Pokazania, Payment])],
  controllers: [ExcelController],
  exports: [ExcelService],
})
export class ExcelModule {}
