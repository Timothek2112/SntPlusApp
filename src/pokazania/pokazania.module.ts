/* eslint-disable prettier/prettier */
import { PokazaniaService } from './pokazania.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PokazaniaController } from './pokazania.controller';
import { Pokazania } from './pokazania.model';
import { PokazaniaUser } from './Pokazania_User.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/getPass/user.model';
import { GetPassModule } from 'src/getPass/get-pass.module';
import { Rates } from './rates.model';

@Module({
  controllers: [PokazaniaController],
  providers: [PokazaniaService],
  imports: [
    SequelizeModule.forFeature([User, Pokazania, PokazaniaUser, Rates]),
    GetPassModule,
    
  ],
  exports: [PokazaniaService],
})
export class PokazaniaModule {}
