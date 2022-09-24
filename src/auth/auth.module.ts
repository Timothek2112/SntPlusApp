import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GetPassModule } from 'src/getPass/get-pass.module';
import { JwtModule } from '@nestjs/jwt';
import { GetPassService } from 'src/getPass/get-pass.service';






@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: { expiresIn: '24h' },
    }),
    GetPassModule,
  ],
})
export class AuthModule {}
