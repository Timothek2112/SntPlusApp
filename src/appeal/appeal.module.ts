import { SequelizeModule } from '@nestjs/sequelize';
import { AppealController } from './appeal.controller';
import { AppealService } from './appeal.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { appeal } from './models/appeal.model';

@Module({
  imports: [SequelizeModule.forFeature([appeal])],
  controllers: [AppealController],
  providers: [AppealService],
})
export class AppealModule {}
