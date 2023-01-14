import { Column, DataType, Model, Table } from 'sequelize-typescript';

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
}
