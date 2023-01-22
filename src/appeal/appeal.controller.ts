/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppealService } from './appeal.service';
import { answerCreationDto } from './dto/answer.dto';
import { appealCreationDto } from './dto/appeal.dto';

@Controller('appeal')
export class AppealController {
  constructor(private appealService: AppealService) {}

  @Post()
  async createAppeal(@Body() createDto: appealCreationDto) {
    return this.appealService.createAppeal(createDto);
  }

  @Get('/forUser/:id')
  async getAppeal(@Param('id') id: number) {
    return await this.appealService.getAppealForId(id);
  }

  @Post('/answer')
  async postAnswer(@Body() dto: answerCreationDto) {
    return await this.appealService.CreateAnswer(dto);
  }
}
