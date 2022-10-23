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

  @Column({ type: DataType.STRING })
  month: string;

  @Column({ type: DataType.STRING })
  year: string;

  @Column({ type: DataType.BOOLEAN })
  isNewCounter: boolean;

  @BelongsToMany(() => User, () => PokazaniaUser)
  pokazania: Pokazania[];
}
