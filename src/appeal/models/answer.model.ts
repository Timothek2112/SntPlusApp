import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { appeal } from './appeal.model';

export class AnswerCreationArgs {
  text: string;
  date: Date;
  appealId: number;
}

@Table({ tableName: 'answer' })
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
  appealId: number;
}
