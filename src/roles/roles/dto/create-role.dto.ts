import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto{
  @ApiProperty({ example: 'User', description: 'Название новой роли' })
  readonly role: string;
}