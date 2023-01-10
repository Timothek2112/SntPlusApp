/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { getUchastokDto } from 'src/getPass/dto/get-uchastok.dto';
import { GetUserDto } from '../getPass/dto/get-user.dto';
import { DebtService } from './debt.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CreatePokazanieDto } from './dto/create-pokazanie.dto';
import { CreateRateDto } from './dto/create-rate.dto';
import { PeriodDto } from './dto/period.dto';
import { Pokazania } from './models/pokazania.model';
import { PokazaniaService } from './pokazania.service';

@Controller('/pokazania')
export class PokazaniaController {
  constructor(
    private pokazaniaService: PokazaniaService,
    private debtService: DebtService,
  ) {}

  @ApiOperation({ summary: 'Создание показаний' })
  @ApiResponse({ status: 200, type: Pokazania })
  @Post('/createPokazanie')
  createPokazanie(@Body() dto: CreatePokazanieDto) {
    return this.pokazaniaService.createPokazanie(dto);
  }

  @Post('/createRate')
  createRate(@Body() dto: CreateRateDto) {
    return this.debtService.createRate(dto);
  }

  @Post('/calculateDebt')
  calculate(@Body() dto: getUchastokDto) {
    return this.debtService.returnDebt(dto);
  }

  @Post('/createPayment')
  createPayment(@Body() dto: CreatePaymentDto) {
    return this.pokazaniaService.createPayment(dto);
  }

  @Post('/pokazaniaForPeriod')
  async pokazaniaPeriod(@Body() dto: PeriodDto) {
    return await this.debtService.returnForPeriod(dto, 'Pokazania');
  }

  @Post('/paymentsForPeriod')
  async paymentsPeriod(@Body() dto: PeriodDto) {
    return await this.debtService.returnForPeriod(dto, 'Payments');
  }

  @Post('/ratesForPeriod')
  async ratesForPeriod(@Body() dto: PeriodDto) {
    return await this.debtService.getRatesForPeriod(dto);
  }
  /* @Post('/debtsForPeriod')
  async electricityDebtsForPeriod(@Body() dto: PeriodDto) {
    return await this.debtService.returnDebtsForPeriod(dto);
  } */
}
