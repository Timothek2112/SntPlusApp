/* eslint-disable prettier/prettier */
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { sequenceEqual } from 'rxjs';
import { Sequelize } from 'sequelize';
import { SequelizeModule } from '@nestjs/sequelize';
import { News } from './models/News.model';

@Module({
  imports: [SequelizeModule.forFeature([News])],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
