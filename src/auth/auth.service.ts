/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../getPass/dto/create-user.dto';
import { Users } from '../getPass/models/user.model';
import { GetPassService } from '../getPass/get-pass.service';
import * as bcrypt from 'bcrypt';
import { createRequire } from 'module';
import { InjectModel } from '@nestjs/sequelize';
import { PatchUserDto } from './dto/patch-user.dto';
import { Role } from 'src/roles/roles/models/roles.model';
import { Uchastki } from 'src/getPass/models/uchastki.model';
import { SetPushToken } from './dto/setToken.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: GetPassService,
    private jwtService: JwtService,
    @InjectModel(Users) private userRepository: typeof Users,
    
  ) {}

  async login(userDto: CreateUserDto) {
    const result = [];
   
    let user = null;
    user = await this.validateUser(userDto);
    result.push(await this.generateToken(user));
    result.push(user.id);
    result.push(user.SntId);
    return result;
    
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

  

  private async generateToken(user: Users) {
    const payload = { id: user.id, login: user.login, role: user.roleId};
    return this.jwtService.sign(payload);
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByLogin(userDto.login);
    let passwordEquals = null;
    try{
      passwordEquals = await bcrypt.compare(
        userDto.password,
        user.password,
      );
    }catch {}
    if (user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({ error: 'Неверный логин или пароль' });
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

  public async getUsersUchastki(userId: number){
    const usersUchastki = await (await this.userRepository.findOne({where: {id: userId}, include:{all: true}}));
    return usersUchastki.uchastki;
  }

  public async SetPushToken(tokenDto: SetPushToken) {
    try{
    await this.userRepository.update({ pushToken: tokenDto.token }, { where: { id: tokenDto.userId }});
    } catch (e){console.log(e)}
  }
}
