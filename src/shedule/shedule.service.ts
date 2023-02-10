/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/sequelize';
import sequelize, { Sequelize } from 'sequelize';
import { Pokazania } from 'src/pokazania/models/pokazania.model';

@Injectable()
export class SheduleService {
    constructor(
        @InjectModel(Pokazania)
    ) {}

  @Cron('0 0 0 * * *')
  PenalityCron() {
    sequelize.Transaction(async (t) => {
        
    })
  }
}
