import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserRoles } from '../../../getPass/models/user_roles.model';
import { User } from '../../../getPass/models/user.model';

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

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
