import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthController } from './auth.controller';
import { GetPassModule } from '../getPass/get-pass.module';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/getPass/models/user.model';
import { Uchastki } from 'src/getPass/models/uchastki.model';
import { Role } from 'src/roles/roles/models/roles.model';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: { expiresIn: '31d' },
    }),
    forwardRef(() => GetPassModule),
    SequelizeModule.forFeature([User, Uchastki, Role]),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
