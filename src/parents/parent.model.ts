import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Student } from "../students/student.model";
import { StudentParent } from "../students/student-parent.model";

interface ParentCreationAttr {
  lastName: string;
  firstName: string;
  thridName: string;
  phone: string;
  studentId: number;
}

@Table({
  tableName: 'parents'
})
export class Parent extends Model<Parent, ParentCreationAttr>{
  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: 'Лукьянов', description: 'Фамилия'})
  @Column({type: DataType.STRING,  allowNull: false})
  lastName: string;

  @ApiProperty({example: 'Глеб', description: 'Имя'})
  @Column({type: DataType.STRING, allowNull: false})
  firstName: string;

  @ApiProperty({example: 'Александрович', description: 'Отчесвто'})
  @Column({type: DataType.STRING, allowNull: false})
  thridName: string;

  @ApiProperty({example: '+7529612512', description: 'Телефон Родителя'})
  @Column({type: DataType.STRING, allowNull: false})
  phone: string;

  @ForeignKey(() => Student)
  @Column({type: DataType.INTEGER})
  studentId: number;

  @BelongsToMany(() => Student, () => StudentParent)
  students: Student[]
}
