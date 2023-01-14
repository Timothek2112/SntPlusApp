/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { appeal } from './models/appeal.model';
import { appealCreationDto } from './dto/appeal.dto';
import { Users } from './../getPass/models/user.model';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Injectable()
export class AppealService {
  constructor(
    @InjectModel(appeal) private appealRepository: typeof appeal,
    @InjectModel(Users) private usersRepository: typeof Users,
  ) {}

  async createAppeal(dto: appealCreationDto) {
    const appeal = await this.appealRepository.create(dto);
    const user = await this.usersRepository.findOne({
      where: { id: dto.userId },
    });
    if (user) {
      user.$add('appeal', [appeal.id]);
      user.appealId = appeal.id;
    } else {
      throw new HttpException('Пользователь не существует', 501);
    }

    return appeal;
  }

  
}
