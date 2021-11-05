import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Parent } from "../parents/parent.model";
import { StudentParent } from "./student-parent.model";
import { School } from "../schools/school.model";
import { User } from "../users/users.model";

interface StudentCreationAttr {
  lastName: string;
  firstName: string;
  thridName: string;
  dateBirthday: Date;
  yearOfAdmission: number;
  schoolId: number;
  trainingPeriodKindId: number;
  instrumentKindId: number;
  address: string;
  secondary_school_number: number;
  general_information: string;
  teacherId: number;
}
@Table({
  tableName: 'students'
})
export class Student extends Model<Student, StudentCreationAttr> {

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

  @ApiProperty({example: '12.04.2001', description: 'Дата рождения'})
  @Column({type: DataType.DATE, allowNull: false})
  dateBirthday: Date;

  @ApiProperty({example: '2018', description: 'Год поступления'})
  @Column({type: DataType.INTEGER, allowNull: false})
  yearOfAdmission: number;


  @ApiProperty({example: 'Пятилетний', description: 'Срок обучения'})
  @Column({type: DataType.INTEGER, allowNull: false})
  trainingPeriodKindId: number;

  @ApiProperty({example: 'Гитара', description: 'инструмент'})
  @Column({type: DataType.INTEGER, allowNull: false})
  instrumentKindId: number;

  @ApiProperty({example: 'Проспект Строителей 11', description: 'Адрес проживания'})
  @Column({type: DataType.STRING, allowNull: false})
  address: string;

  @ApiProperty({example: '12', description: 'Номер общеобразовательной школы'})
  @Column({type: DataType.INTEGER, allowNull: false})
  secondary_school_number: number;

  @ApiProperty({example: 'Слух - 9, Память - 9 и т.д.', description: 'Общая информация'})
  @Column({type: DataType.STRING, allowNull: true})
  general_information: string;

  @BelongsToMany(() => Parent, () => StudentParent)
  parents: Parent[];

  @ForeignKey(() => School)
  @Column({type: DataType.INTEGER})
  schoolId: number;

  @BelongsTo(() => School )
  school: School

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  teacherId: number;

  @BelongsTo(() => User )
  teacher: User
}
