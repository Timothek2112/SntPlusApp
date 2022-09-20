import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/roles/roles/roles.model';
import { User } from '../user.model';
import { GetPassController } from './get-pass.controller';
import { GetPassService } from './get-pass.service';
import { UserRoles } from './user_roles.model';

@Module({
  controllers: [GetPassController],
  providers: [GetPassService],
  imports: [SequelizeModule.forFeature([User, Role, UserRoles])],
})
export class GetPassModule {}
