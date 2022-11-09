/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetUserDto } from 'src/getPass/dto/get-user.dto';
import { CreatePokazanieDto } from './create-pokazanie.dto';
import { CreateRateDto } from './create-rate.dto';
import { Pokazania } from './pokazania.model';
import { PokazaniaService } from './pokazania.service';

@Controller('/pokazania')
export class PokazaniaController {
  constructor(private pokazaniaService: PokazaniaService) {}
  
  @ApiOperation({ summary: 'Создание показаний' })
  @ApiResponse({ status: 200, type: Pokazania })
  @Post('/createPokazanie')
  createPokazanie(@Body() dto: CreatePokazanieDto) {
    return this.pokazaniaService.createPokazanie(dto);
  }

  @Post('/createRate')
  createRate(@Body() dto: CreateRateDto){
    return this.pokazaniaService.createRate(dto);
  }

  @Post('/calculateDebt')
  calculate(@Body() dto: GetUserDto){
    return this.pokazaniaService.calculateDebt(dto);
  }
}
