import { SequelizeModule } from '@nestjs/sequelize';
import { AppealController } from './appeal.controller';
import { AppealService } from './appeal.service';
import { Users } from './../getPass/models/user.model';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { appeal } from './models/appeal.model';

@Module({
  imports: [SequelizeModule.forFeature([appeal, Users])],
  controllers: [AppealController],
  providers: [AppealService],
})
export class AppealModule {}
