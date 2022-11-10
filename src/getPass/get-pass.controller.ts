import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { GetPassService } from './get-pass.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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
}
