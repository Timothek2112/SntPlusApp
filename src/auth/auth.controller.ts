/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../getPass/dto/create-user.dto';
import { GetUserDto } from '../getPass/dto/get-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiProperty({example: '{"login": example, "password": example', description: "Получение токена для логина"})
  @Post('/login')
  async login(@Body() userDto: CreateUserDto) {
    try {
      const TokenUser = await this.authService.login(userDto);
      if (TokenUser == null) {
        throw new UnauthorizedException({
          message: 'Функция логина вернула null',
        });
      }
      if(TokenUser[0] != "error"){
        return { token: TokenUser[0], userid: TokenUser[1] };
      }
      else{
        return {error: TokenUser[1]}
      }
    } catch (e) {
      return {error: "wrong password"}
    }
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
}
