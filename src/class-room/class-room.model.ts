import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { School } from "../schools/school.model";
import { Branch } from "../branch/branch.model";

interface ClassRoomCreationAttr {
  number: number;
  title: string;
  schoolId: number;
  branchId: number;
}
@Table({
  tableName: 'classes-room'
})
export class ClassRoom extends Model<ClassRoom, ClassRoomCreationAttr> {

  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: '1', description: 'Номер класса или кабинета'})
  @Column({type: DataType.INTEGER, allowNull: true})
  number: number;

  @ApiProperty({example: 'Класс или актовый зал или иное', description: 'Описание помещения'})
  @Column({type: DataType.STRING, allowNull: false})
  title: string;


  @ForeignKey(() => School)
  @Column({type: DataType.INTEGER})
  schoolId: number;

  @BelongsTo(() => School )
  school: School

  @ForeignKey(() => Branch)
  @Column({type: DataType.INTEGER})
  branchId: number;

  @BelongsTo(() => Branch )
  branch: Branch
}
