/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
import { AppealService } from './appeal.service';
import { appealCreationDto } from './dto/appeal.dto';

@Controller('appeal')
export class AppealController {
  constructor(private appealService: AppealService) {}

  @Post()
  async createAppeal(@Body() createDto: appealCreationDto) {
    return this.appealService.createAppeal(createDto);
  }
}
