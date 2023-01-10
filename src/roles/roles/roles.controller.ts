import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Post()
  async create(@Body() dto: CreateRoleDto) {
    return await this.rolesService.createRole(dto);
  }

  @Get('/:value')
  async getByValue(@Param('value') value: string) {
    return await this.rolesService.getRole(value);
  }
}
