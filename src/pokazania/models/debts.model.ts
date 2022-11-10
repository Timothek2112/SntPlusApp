import {
  Column,
  DataType,
  Table,
  Model,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from 'src/getPass/models/user.model';
import { DebtsUser } from './Debts_User.model';

interface DebtCreationAttrs {
  water: number;
  electricity: number;
  membership: number;
  penality: number;
}

@Table({ tableName: 'debts' })
export class Debts extends Model<Debts, DebtCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.FLOAT })
  water: number;

  @Column({ type: DataType.FLOAT })
  electricity: number;

  @Column({ type: DataType.FLOAT })
  penality: number;

  @Column({ type: DataType.FLOAT })
  membership: number;

  @Column({ type: DataType.FLOAT })
  month: number;

  @Column({ type: DataType.FLOAT })
  year: number;

  @Column({ type: DataType.INTEGER })
  lastPokazanieId: number;

  @BelongsToMany(() => User, () => DebtsUser)
  debts: Debts[];
}
