import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { GetPassService } from './get-pass.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { createUchastokDto } from './dto/create-uchastok.dto';
import { PeriodDto } from 'src/pokazania/dto/period.dto';
import { GetUserDto } from './dto/get-user.dto';

@Controller('/get-pass')
export class GetPassController {
  constructor(private getPassService: GetPassService) {}
  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.getPassService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Получение списка всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.getPassService.getAllUsers();
  }

  @Post('/create_uchastok')
  createUchastok(@Body() dto: createUchastokDto) {
    return this.getPassService.createUchastok(dto);
  }

  @Get('/getUser')
  getUser(@Req() request: GetUserDto) {
    return this.getPassService.getUserById(request.userid);
  }
}
