import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Users } from 'src/getPass/models/user.model';
import { UserRoles } from 'src/getPass/models/user_roles.model';
import { SNT } from 'src/snt/model/snt.model';

interface RoleCreationAttrs {
  role: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  role: string;

  @HasMany(() => Users)
  users: Users[];
}
