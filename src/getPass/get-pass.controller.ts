import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Users } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { GetPassService } from './get-pass.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { createUchastokDto } from './dto/create-uchastok.dto';
import { PeriodDto } from 'src/pokazania/dto/period.dto';
import { GetUserDto } from './dto/get-user.dto';
import { Uchastki } from './models/uchastki.model';
import { PatchUserDto } from 'src/auth/dto/patch-user.dto';

@ApiTags('Управление пользователями')
@Controller('/get-pass')
export class GetPassController {
  constructor(private getPassService: GetPassService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 201, type: Users })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.getPassService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Получение списка всех пользователей' })
  @ApiResponse({ status: 200, type: [Users] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.getPassService.getAllUsers();
  }

  @ApiProperty({
    example: createUchastokDto,
    description: 'Создание участка и присовение его пользователю',
  })
  @ApiResponse({ status: 201, type: [Uchastki] })
  @Post('/create_uchastok')
  createUchastok(@Body() dto: createUchastokDto) {
    return this.getPassService.createUchastok(dto);
  }

  @Get('/getUser')
  getUser(@Req() request: GetUserDto) {
    return this.getPassService.getUserById(request.userid);
  }

  @Patch('/user/:id')
  async patch_user(
    @Body() patchuserDto: PatchUserDto,
    @Param('id') id: number,
  ) {
    return await this.getPassService.patchUser(patchuserDto, id);
  }

  @Get('/uchastokId/:uchastok/:sntId')
  async GetUchastokId(
    @Param('uchastok') uchastok: number,
    @Param('sntId') sntId: number,
  ) {
    return await this.getPassService.GetUchastokId(uchastok, sntId);
  }
}
