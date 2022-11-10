/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetUserDto } from '../getPass/dto/get-user.dto';
import { DebtService } from './debt.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CreatePokazanieDto } from './dto/create-pokazanie.dto';
import { CreateRateDto } from './dto/create-rate.dto';
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
  calculate(@Body() dto: GetUserDto) {
    return this.debtService.returnDebt(dto);
  }

  @Post('/createPayment')
  createPayment(@Body() dto: CreatePaymentDto) {
    return this.pokazaniaService.createPayment(dto);
  }
}
