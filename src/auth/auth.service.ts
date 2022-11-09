/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/getPass/dto/create-user.dto';
import { User } from 'src/getPass/user.model';
import { GetPassService } from '../getPass/get-pass.service';
import * as bcrypt from 'bcrypt';
import { getSystemErrorMap } from 'util';
import { Console } from 'console';
import { resourceLimits } from 'worker_threads';
import { GetUserDto } from 'src/getPass/dto/get-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private userService: GetPassService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const result = [];
    try {
      let user = null;
      user = await this.validateUser(userDto);
      
      if (user == null) {
        throw new UnauthorizedException({ message: 'Неверный логин или пароль' });
      }
      result.push(await this.generateToken(user));
      result.push(user.id);
      return result;
    } catch (e) {
      console.log("login er");
      result.push("error", "wrong password");
      return result;
    }
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByLogin(userDto.login);
    if (candidate) {
      throw new UnauthorizedException({
        message: 'Пользователь с таким логином уже существует',
      });
      return 0;
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    return await this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { id: user.id, login: user.login, roles: user.roles };
    return this.jwtService.sign(payload);
  }

  private async validateUser(userDto: CreateUserDto) {
    try {
      const user = await this.userService.getUserByLogin(userDto.login);

      const passwordEquals = await bcrypt.compare(
        userDto.password,
        user.password,
      );

      if (user && passwordEquals) {
        return user;
      }

      throw new UnauthorizedException({ message: 'Неверный логин или пароль' });
    } catch (e) {
      console.log(e.message);
    }
  }

  public async getUser(userid: number){
    let user;
    
    try{
    user = await this.userService.getUserById(userid);
    }catch(e){
      console.log(e.message)
    }

    if(user){
      return user;
    }else{
      return '"message": "error: no user"';
    }
  }
}
