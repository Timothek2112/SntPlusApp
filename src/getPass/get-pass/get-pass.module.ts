import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user.model';
import { GetPassController } from './get-pass.controller';
import { GetPassService } from './get-pass.service';

@Module({
  controllers: [GetPassController],
  providers: [GetPassService],
  imports: [SequelizeModule.forFeature([User])],
})
export class GetPassModule {}
