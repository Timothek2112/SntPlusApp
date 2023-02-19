/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/sequelize';
import { Uchastki } from 'src/getPass/models/uchastki.model';
import { DebtService } from 'src/pokazania/debt.service';
import { DebtDto } from 'src/pokazania/dto/create-debt.dto';
import { CreatePokazanieDto } from 'src/pokazania/dto/create-pokazanie.dto';
import { PeriodDto } from 'src/pokazania/dto/period.dto';
import { Pokazania } from 'src/pokazania/models/pokazania.model';
import { PokazaniaService } from 'src/pokazania/pokazania.service';
import { createLogger, transports, format } from 'winston';

@Injectable()
export class SheduleService {
  private logger = createLogger({
    transports: [
      new transports.File({
        filename: 'logs',
      }),
    ],
    format: format.combine(
      format.colorize(),
      format.timestamp(),
      format.printf(({ timestamp, level, message }) => {
        return `[${timestamp}] ${level}: ${message}`;
      }),
    ),
  });

  constructor(
    @InjectModel(Pokazania) private pokazaniaRepository: typeof Pokazania,
    @InjectModel(Uchastki) private uchastkiRepository: typeof Uchastki,
    private debtService: DebtService,
    private pokazaniaService: PokazaniaService,
  ) {}

  @Cron('1 1 1 * * *')
  async PenalityCron() {
    const endDate = this.GetEndDate();
    const uchastki = await this.uchastkiRepository.findAll();
    uchastki.forEach(async (uchastok) => {
      const period = new PeriodDto();
      period.startPeriodM = 0;
      period.startPeriodY = 0;
      period.endPeriodM = endDate.getMonth() + 1;
      period.endPeriodY = endDate.getFullYear() % 100;
      period.uchastokId = uchastok.id;
      period.SntId = uchastok.SntId;
      try {
        const calculatedDebt: DebtDto =
          await this.debtService.CalculateDebtForPeriod(period);
        calculatedDebt.penality +=
          calculatedDebt.membership * 0.01 + calculatedDebt.target * 0.01;

        const pokazanieDto = new CreatePokazanieDto();
        pokazanieDto.penality = calculatedDebt.penality;
        pokazanieDto.month = new Date().getMonth() + 1;
        pokazanieDto.year = new Date().getFullYear() % 100;
        pokazanieDto.SntId = uchastok.SntId;
        pokazanieDto.uchastokId = uchastok.id;

        const pok = await this.pokazaniaService.createPokazanie(pokazanieDto);
        this.logger.info('Долг подсчитан ');
        this.logger.info(pok.toString());
      } catch (e) {
        this.logger.error(
          'Ошибка подсчета пени: ' +
            e +
            ' участок ' +
            uchastok.id +
            ' снт ' +
            uchastok.SntId,
        );
      }
    });
  }

  GetEndDate() {
    const today = new Date();
    today.setMonth(today.getMonth() - 1);
    return today;
  }
}
