/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SNT } from './model/snt.model';
import { sntDto } from './dto/snt.dto';

@Injectable()
export class SntService {
  constructor(@InjectModel(SNT) private sntRepository: typeof SNT) {}

  async GetSntById(id: number) {
    return await this.sntRepository.findOne({
      where: { id: id },
      include: { all: true },
    });
  }

  async PostSnt(dto: sntDto) {
    console.log(dto);
    return await this.sntRepository.create(dto);
  }
}
