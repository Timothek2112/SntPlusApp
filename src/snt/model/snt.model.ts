import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { appeal } from 'src/appeal/models/appeal.model';
import { Uchastki } from 'src/getPass/models/uchastki.model';
import { Users } from 'src/getPass/models/user.model';
import { News } from 'src/news/models/News.model';
import { Debts } from 'src/pokazania/models/debts.model';
import { Payment } from 'src/pokazania/models/payments.model';
import { Pokazania } from 'src/pokazania/models/pokazania.model';
import { Rates } from 'src/pokazania/models/rates.model';

export interface SntCreationArgs {
  title: string;
}

@Table({ tableName: 'snts' })
export class SNT extends Model<SNT, SntCreationArgs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  title: string;

  @HasMany(() => Users)
  Users: Users[];

  @HasMany(() => Pokazania)
  Pokazania: Pokazania[];

  @HasMany(() => Payment)
  Payments: Payment[];

  @HasMany(() => appeal)
  Appeals: appeal[];

  @HasMany(() => Debts)
  Debts: Debts[];

  @HasMany(() => News)
  News: News[];

  @HasMany(() => Uchastki)
  Uchastki: Uchastki[];

  @HasMany(() => Rates)
  Rates: Rates[];
}
