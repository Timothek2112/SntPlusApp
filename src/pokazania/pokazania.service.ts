/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { range } from 'rxjs';
import { Op } from 'sequelize';
import { JSON } from 'sequelize';
import { GetUserDto } from 'src/getPass/dto/get-user.dto';
import { GetPassService } from 'src/getPass/get-pass.service';
import { User } from 'src/getPass/user.model';
import { CreatePokazanieDto } from './create-pokazanie.dto';
import { CreateRateDto } from './create-rate.dto';
import { Pokazania } from './pokazania.model';
import { PokazaniaUser } from './Pokazania_User.model';
import { Rates } from './rates.model';

@Injectable()
export class PokazaniaService {
  constructor(
    @InjectModel(Pokazania) private pokazania: typeof Pokazania,
    @InjectModel(Rates) private rates: typeof Rates,
    @InjectModel(PokazaniaUser) private pokazaniaUser: typeof PokazaniaUser,
    @InjectModel(User) private userRepository: typeof User,
    private userService: GetPassService,
  ) {}

  async createPokazanie(dto: CreatePokazanieDto) {
    const id = dto.userid;
    const user = await this.userService.getUserById(id);
    const pokazanie = await this.pokazania.create(dto);
    await user.$add('pokazania', [pokazanie.id])
    user.pokazania.push(pokazanie);

    return pokazanie;
  }

  async createRate(dto: CreateRateDto){
    let rate = null;
    const month = dto.month;
    const year = dto.year;
    const o = await this.rates.findOne({where: {month: month,year: year}, include: {all: true}});
    
    if(o){
      await this.rates.update(dto, {where: {month,year}});
      return o;
    }else{
      rate = await this.rates.create(dto);
      return rate;
    }
  }

  async calculateDebt(dto: GetUserDto){
    const user = await this.userRepository.findOne({where: {id: dto.userid}, include: {all: true}});
    const rates = await this.rates.findAll();
    const userPokazania = user.pokazania;
    
    const rate = await this.rates.findOne({where: {month: {[Op.lte]: userPokazania[0].month}, year :{[Op.lte]: userPokazania[0].year} }, order: [['id', 'DESC']]});
    let eDebt = userPokazania[0].electricity * rate.elecricity;
    let wDebt = userPokazania[0].water * rate.water;

    for(let i = 1; i < userPokazania.length; i++){
        const rate = await this.rates.findOne({where: {month: {[Op.lte]: userPokazania[i].month}, year :{[Op.lte]: userPokazania[i].year} }, order: [['id', 'DESC']]});
        wDebt += (userPokazania[i].water - userPokazania[i-1].water) * rate.water;
        eDebt += (userPokazania[i].electricity - userPokazania[i-1].electricity) * rate.elecricity;

        

      }
      
      return [wDebt, eDebt];
  }
}
