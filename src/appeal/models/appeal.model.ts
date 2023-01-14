import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Users } from 'src/getPass/models/user.model';

export class AppealCreationArgs {
  theme: string;
  text: string;
  date: Date;
  userId: number;
}

@Table({ tableName: 'appeal' })
export class appeal extends Model<appeal, AppealCreationArgs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  theme: string;

  @Column({ type: DataType.TEXT })
  text: string;

  @Column({ type: DataType.DATE })
  date: Date;

  @BelongsTo(() => Users)
  user: Users;

  @ForeignKey(() => Users)
  userId: number;

  @Column({ type: DataType.BOOLEAN })
  isActual: boolean;
}
