import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from '../roles/roles/models/roles.model';
import { RolesModule } from '../roles/roles/roles.module';
import { User } from './models/user.model';
import { GetPassController } from './get-pass.controller';
import { GetPassService } from './get-pass.service';
import { UserRoles } from './models/user_roles.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [GetPassController],
  providers: [GetPassService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [GetPassService],
})
export class GetPassModule {}
