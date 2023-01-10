import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Debts } from 'src/pokazania/models/debts.model';
import { Payment } from 'src/pokazania/models/payments.model';
import { Pokazania } from 'src/pokazania/models/pokazania.model';
import { Users } from './user.model';

export interface UchastokCreationAttrs {
  uchastok: number;
  userId: number;
}

@Table({ tableName: 'uchastki' })
export class Uchastki extends Model<Uchastki, UchastokCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, primaryKey: true })
  uchastok: number;

  @ForeignKey(() => Users)
  userId: number;

  @BelongsTo(() => Users)
  user: Users;

  @HasMany(() => Pokazania)
  pokazania: Pokazania[];

  @HasMany(() => Debts)
  debts: Debts[];

  @HasMany(() => Payment)
  payments: Payment[];
}
