import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  BelongsTo
} from 'sequelize-typescript';
import { appeal } from './appeal.model';
import { SNT } from 'src/snt/model/snt.model';

export class AnswerCreationArgs {
  text: string;
  date: Date;
  appealId: number;
}

@Table({ tableName: 'Answers' })
export class answer extends Model<answer, AnswerCreationArgs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.TEXT })
  text: string;

  @Column({ type: DataType.DATE })
  date: Date;

  @ForeignKey(() => appeal)
  @Column({ type: DataType.INTEGER })
  appealId: number;

  @ForeignKey(() => SNT)
  @Column({ type: DataType.INTEGER })
  SntId: number;
}
