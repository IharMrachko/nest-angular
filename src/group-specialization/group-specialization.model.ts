import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/users.model";
import { UserGroupSpecialization } from "../users/user-group-specialization.model";

interface GroupSpecializationCreationAttr {
  userId: number;
  groupSpecializationId: number;
 }
@Table({
  tableName: 'groupSpecialization'
})
export class GroupSpecialization extends Model<GroupSpecialization, GroupSpecializationCreationAttr> {

  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: '2', description: 'Id из справочника GroupSpecialization'})
  @Column({type: DataType.INTEGER, allowNull: false})
  groupSpecializationId: number;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  userId: number;

  @BelongsToMany(() => User, () => UserGroupSpecialization )
  users: User[]

}
