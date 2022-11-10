import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../getPass/models/user.model';
import { Pokazania } from './pokazania.model';

interface Pokazania_UserCreationArttrs {
  pokazaniaId: number;
  UserId: number;
}

@Table({ tableName: 'PokazaniaUser' })
export class PokazaniaUser extends Model<
  PokazaniaUser,
  Pokazania_UserCreationArttrs
> {
  @ForeignKey(() => Pokazania)
  @Column({ type: DataType.INTEGER })
  pokazaniaId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;
}
