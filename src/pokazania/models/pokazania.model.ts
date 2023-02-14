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
import { Users } from '../../getPass/models/user.model';
import { DebtService } from '../debt.service';
import { Rates } from './rates.model';
import { SNT } from 'src/snt/model/snt.model';

interface PokazaniaCreationAttr {
  water: number;
  electricity: number;
  membership: number;
  target: number;
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

  @Column({ type: DataType.FLOAT })
  target: number;

  @Column({ type: DataType.INTEGER })
  month: number;

  @Column({ type: DataType.INTEGER })
  year: number;

  @Column({ type: DataType.BOOLEAN })
  isNewCounter: boolean;

  @ForeignKey(() => Uchastki)
  uchastokId: number;

  @BelongsTo(() => Uchastki)
  uchastok: Uchastki;

  @BelongsTo(() => SNT)
  SNT: SNT;

  @ForeignKey(() => SNT)
  @Column({ type: DataType.INTEGER })
  SntId: number;
}
