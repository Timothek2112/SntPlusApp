import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/roles/roles/roles.model';
import { RolesModule } from 'src/roles/roles/roles.module';
import { User } from './user.model';
import { GetPassController } from './get-pass.controller';
import { GetPassService } from './get-pass.service';
import { UserRoles } from './user_roles.model';
import { AuthModule } from 'src/auth/auth.module';

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
