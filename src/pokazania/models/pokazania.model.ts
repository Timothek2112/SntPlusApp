import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../getPass/models/user.model';

interface PokazaniaCreationAttr {
  water: number;
  electricity: number;
  membership: number;
  isNewCounter: boolean;
  year: number;
  month: number;
}

@Table({ tableName: 'pokazania' })
export class Pokazania extends Model<Pokazania, PokazaniaCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @Column({ type: DataType.FLOAT, allowNull: true })
  water: number;

  @Column({ type: DataType.FLOAT, allowNull: true })
  electricity: number;

  @Column({ type: DataType.FLOAT, allowNull: true })
  membership: number;

  @Column({ type: DataType.FLOAT, allowNull: true })
  penality: number;

  @Column({ type: DataType.INTEGER })
  month: number;

  @Column({ type: DataType.INTEGER })
  year: number;

  @Column({ type: DataType.BOOLEAN })
  isNewCounter: boolean;

  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
