import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Student } from "./student.model";
import { Parent } from "../parents/parent.model";

interface StudentParentCreationAttr {
  studentId: number;
  parentId: number;
}

@Table({
  tableName: 'students_parents',
  createdAt: false,
  updatedAt: false
})
export class StudentParent extends Model<StudentParent, StudentParentCreationAttr> {

  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ForeignKey(() => Student)
  @Column({type: DataType.INTEGER})
  studentId: number;

  @ForeignKey(() => Parent)
  @Column({type: DataType.INTEGER})
  parentId: number;
}
