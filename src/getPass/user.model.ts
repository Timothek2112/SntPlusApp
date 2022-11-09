import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Pokazania } from 'src/pokazania/pokazania.model';
import { PokazaniaUser } from 'src/pokazania/Pokazania_User.model';
import { Role } from 'src/roles/roles/roles.model';
import { UserRoles } from './user_roles.model';

interface UserCreationAttrs {
  login: string;
  password: string;
  name: string;
  surname: string;
  uchastok: number;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({
    description:
      'Присваевается автоматически, уникальный идентификатор пользователя',
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'exampleLogin',
    description: 'Логин пользователя',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  login: string;
  @ApiProperty({
    example: 'examplePassword',
    description: 'Пароль пользователя',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({
    example: 'Иван',
    description: 'Имя владельца аккаунта',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({
    example: 'Иванович',
    description: 'Фамилия владельца аккаунта',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  surname: string;
  @ApiProperty({
    example: '56',
    description: 'Номер участка владельца аккаунта',
  })
  @Column({ type: DataType.INTEGER, allowNull: false })
  uchastok: number;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @BelongsToMany(() => Pokazania, () => PokazaniaUser)
  pokazania: Pokazania[];
}
