import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GetPassModule } from '../getPass/get-pass.module';
import { JwtModule } from '@nestjs/jwt';
import { GetPassService } from '../getPass/get-pass.service';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: { expiresIn: '24h' },
    }),
    forwardRef(() => GetPassModule),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
