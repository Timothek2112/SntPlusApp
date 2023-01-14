/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { appeal } from './models/appeal.model';
import { appealCreationDto } from './dto/appeal.dto';

@Injectable()
export class AppealService {
  constructor(@InjectModel(appeal) private appealRepository: typeof appeal) {}

  async createAppeal(dto: appealCreationDto) {
    return this.appealRepository.create(dto);
  }
}
