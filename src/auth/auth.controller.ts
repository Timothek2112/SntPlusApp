/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../getPass/dto/create-user.dto';
import { GetUserDto } from '../getPass/dto/get-user.dto';
import { AuthService } from './auth.service';
import { PatchUserDto } from './dto/patch-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  
  @ApiProperty({example: '{"login": example, "password": example', description: "Получение токена для логина"})
  @Post('/login')
  async login(@Body() userDto: CreateUserDto) {
    const TokenUser = await this.authService.login(userDto);
    return { token: TokenUser[0], userid: TokenUser[1] };
  }

  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/getUser')
  getUser(@Body() userid: GetUserDto){
    return this.authService.getUser(userid.userid);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/checkLogin')
  checkLogin() {
    return true;
  }

  @Get('/usersUchastki/:id')
  getUsersUchastki(@Param('id') id: number){
    return this.authService.getUsersUchastki(id);
  }
}
