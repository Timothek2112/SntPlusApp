/*
https://docs.nestjs.com/controllers#controllers
*/

import { ExcelService } from './excel.service';
import { Body, Controller, Post } from '@nestjs/common';
import { PeriodDto } from './dto/period.dto';

@Controller('/excel')
export class ExcelController {
  constructor(private excelService: ExcelService) {}

  @Post('/calculateForPeriod')
  calculateForPeriod(@Body() dto: PeriodDto) {
    return this.excelService.calculateForPeriod(dto);
  }
}
