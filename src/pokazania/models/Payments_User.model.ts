import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../getPass/models/user.model';
import { Payment } from './payments.model';

interface Payments_UserCreationAttrs {
  paymentId: number;
  userId: number;
}

@Table({ tableName: 'PaymentsUser' })
export class PaymentsUser extends Model<
  PaymentsUser,
  Payments_UserCreationAttrs
> {
  @ForeignKey(() => Payment)
  @Column({ type: DataType.INTEGER })
  paymentId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;
}
