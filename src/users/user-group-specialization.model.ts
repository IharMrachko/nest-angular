import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./users.model";
import { GroupSpecialization } from "../group-specialization/group-specialization.model";


interface UserGroupSpecializationCreationAttr {
  groupSpecializationId: number;
  userId: number;
}

@Table({
  tableName: 'user_group-specialization',
  createdAt: false,
  updatedAt: false
})
export class UserGroupSpecialization extends Model<UserGroupSpecialization, UserGroupSpecializationCreationAttr> {

  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ForeignKey(() => GroupSpecialization)
  @Column({type: DataType.INTEGER})
  groupSpecializationId: number;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  userId: number;

}
