import { SequelizeModule } from '@nestjs/sequelize';
import { AppealController } from './appeal.controller';
import { AppealService } from './appeal.service';
import { Users } from './../getPass/models/user.model';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { appeal } from './models/appeal.model';
import { answer } from './models/answer.model';

@Module({
  imports: [SequelizeModule.forFeature([appeal, Users, answer])],
  controllers: [AppealController],
  providers: [AppealService],
})
export class AppealModule {}
