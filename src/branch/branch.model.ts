import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { School } from "../schools/school.model";
import { ClassRoom } from "../class-room/class-room.model";

interface BranchCreationAttr {
  address: string;
  schoolId: number;
}
@Table({
  tableName: 'branch'
})
export class Branch extends Model<Branch, BranchCreationAttr> {

  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: 'Проспект Победы 29', description: 'адрес филиала'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  address: string;

  @ForeignKey(() => School)
  @Column({type: DataType.INTEGER})
  schoolId: number;

  @BelongsTo(() => School )
  school: School

  @HasMany(() => ClassRoom)
  classRooms: ClassRoom[];
}
