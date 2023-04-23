import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './models/roles.model';

@ApiTags('Управление ролями')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({ summary: 'Создание роли'})
  @ApiResponse({ status: 201, type: Role})
  @ApiProperty({
    example: CreateRoleDto,
    description: 'Создание роли'
  })
  @Post()
  async create(@Body() dto: CreateRoleDto) {
    return await this.rolesService.createRole(dto);
  }
  
  @Get('/:value')
  async getByValue(@Param('value') value: string) {
    return await this.rolesService.getRole(value);
  }
}
