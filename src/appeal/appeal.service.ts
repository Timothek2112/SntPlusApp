/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { appeal } from './models/appeal.model';
import { appealCreationDto } from './dto/appeal.dto';
import { Users } from './../getPass/models/user.model';
import { answerCreationDto } from './dto/answer.dto';
import { answer } from './models/answer.model';

@Injectable()
export class AppealService {
  constructor(
    @InjectModel(appeal) private appealRepository: typeof appeal,
    @InjectModel(Users) private usersRepository: typeof Users,
    @InjectModel(answer) private answerRepository: typeof answer,
  ) {}

  async createAppeal(dto: appealCreationDto) {
    const appeal = await this.appealRepository.create(dto);
    const user = await this.usersRepository.findOne({
      where: { id: dto.userId },
    });
    if (user) {
      user.$add('appeal', [appeal.id]);
    } else {
      throw new HttpException('Пользователь не существует', 501);
    }

    return appeal;
  }

  async getAppealForId(id: number) {
    const appeals = await this.appealRepository.findAll({
      where: { userId: id },
      include: { all: true },
      order: [['date', 'DESC']],
    });
    const result = [];

    appeals.forEach((appeal) => {
      const hasAnswer = appeal.thisAnswer == null ? false : true;
      result.push({
        theme: appeal.theme,
        mainText: appeal.text,
        date: appeal.date,
        answer: appeal.thisAnswer != null ? appeal.thisAnswer.text : '',
        answerDate:
          appeal.thisAnswer != null ? appeal.thisAnswer.date : Date.now,
        status: hasAnswer,
      });
    });
    return result;
  }

  async CreateAnswer(dto: answerCreationDto) {
    const newAnswer = await this.answerRepository.create(dto);
    const appealForAnswer = await this.appealRepository.findOne({
      where: { id: dto.appealId },
    });
    appealForAnswer.$set('thisAnswer', [newAnswer.id]);
    return newAnswer;
  }
}
