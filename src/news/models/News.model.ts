import { Column, DataType, Model, Table, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { SNT } from 'src/snt/model/snt.model';

export class NewsCreationArgs {
  title: string;
  full_text: string;
  date: Date;
}

@Table({ tableName: 'News' })
export class News extends Model<News, NewsCreationArgs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  title: string;

  @Column({ type: DataType.TEXT })
  full_text: string;

  @Column({ type: DataType.DATE })
  date: Date;



  @ForeignKey(() => SNT)
  @Column({ type: DataType.INTEGER })
  SntId: number;
}
