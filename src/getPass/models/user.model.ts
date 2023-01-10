import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Model,
  Table,
  HasMany,
  ForeignKey,
  BelongsTo,
  HasOne,
} from 'sequelize-typescript';
import { Debts } from 'src/pokazania/models/debts.model';
import { Payment } from 'src/pokazania/models/payments.model';
import { Pokazania } from '../../pokazania/models/pokazania.model';
import { Role } from '../../roles/roles/models/roles.model';
import { Uchastki } from './uchastki.model';

interface UserCreationAttrs {
  login: string;
  password: string;
  name: string;
  surname: string;
  uchastok: number;
}

@Table({ tableName: 'users' })
export class Users extends Model<Users, UserCreationAttrs> {
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

  @HasMany(() => Uchastki)
  uchastki: Uchastki[];

  @BelongsTo(() => Role)
  role: Role;

  @ForeignKey(() => Role)
  roleId: number;
}
