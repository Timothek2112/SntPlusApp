import {
  AfterCreate,
  AfterUpdate,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Uchastki } from 'src/getPass/models/uchastki.model';
import { Users } from 'src/getPass/models/user.model';
import { DebtService } from '../debt.service';

interface PaymentCreationAttrs {
  water: number;
  electricity: number;
  penality: number;
  membership: number;
  target: number;
  month: number;
  year: number;
}

@Table({ tableName: 'payments' })
export class Payment extends Model<Payment, PaymentCreationAttrs> {
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
  target: number;

  @Column({ type: DataType.FLOAT })
  membership: number;

  @Column({ type: DataType.INTEGER })
  month: number;

  @Column({ type: DataType.INTEGER })
  year: number;

  @ForeignKey(() => Uchastki)
  uchastokId: number;

  @BelongsTo(() => Uchastki)
  uchastok: Uchastki;
}
