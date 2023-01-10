import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'exampleLogin', description: 'Логин' })
  readonly login: string;
  @ApiProperty({
    example: 'examplePassword',
    description: 'Пароль, в базе данных хранится в хэшированном виде',
  })
  readonly password: string;
  @ApiProperty({ example: 'Иван', description: 'Имя владельца аккаунта' })
  readonly name?: string;
  @ApiProperty({
    example: 'Иванович',
    description: 'Фамилия владельца аккаунта',
  })
  readonly surname?: string;
  @ApiProperty({
    example: '56',
    description: 'Номер участка владельца аккаунта',
  })
  readonly uchastok?: number;
}
