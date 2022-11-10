import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../getPass/models/user.model';
import { Debts } from './debts.model';

interface Debts_UserCreationAttrs {
  debtId: number;
  userId: number;
}

@Table({ tableName: 'DebtsUser' })
export class DebtsUser extends Model<DebtsUser, Debts_UserCreationAttrs> {
  @ForeignKey(() => Debts)
  @Column({ type: DataType.INTEGER })
  debtId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;
}
