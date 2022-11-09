import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/getPass/user.model';
import { PokazaniaUser } from './Pokazania_User.model';

interface PokazaniaCreationAttr {
  water: number;
  electricity: number;
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
  @Column({ type: DataType.INTEGER, allowNull: true })
  water: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  electricity: number;

  @Column({ type: DataType.INTEGER })
  month: number;

  @Column({ type: DataType.INTEGER })
  year: number;

  @Column({ type: DataType.BOOLEAN })
  isNewCounter: boolean;

  @BelongsToMany(() => User, () => PokazaniaUser)
  pokazania: Pokazania[];
}
