import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Student } from "../students/student.model";
import { User } from "../users/users.model";
import { Branch } from "../branch/branch.model";
import { ClassRoom } from "../class-room/class-room.model";
import { Events } from "../events/events.model";

interface SchoolCreationAttr {
  name: string;
  number: number;
  locality: string;
  address: string;
  email: string;
}
@Table({
  tableName: 'schools'
})
export class School extends Model<School, SchoolCreationAttr> {

  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: 'ДШИ', description: 'Детская школа исскуств'})
  @Column({type: DataType.STRING,  allowNull: false})
  name: string;

  @ApiProperty({example: '5', description: 'номер школы'})
  @Column({type: DataType.INTEGER, allowNull: false})
  number: number;

  @ApiProperty({example: 'г. Витебск', description: 'населенный пункт'})
  @Column({type: DataType.STRING, allowNull: false})
  locality: string;

  @ApiProperty({example: 'Проспект Победы 10', description: 'адрес'})
  @Column({type: DataType.STRING, allowNull: false})
  address: string;

  @ApiProperty({example: 'dshi5@mail.ru', description: 'Email адрес школы'})
  @Column({type: DataType.STRING, allowNull: false, unique: true,})
  email: string;

  @HasMany(() => Student)
  students: Student[]

  @HasMany(() => ClassRoom)
  classRooms: ClassRoom[]

  @HasMany(() => User)
  users: User[]

  @HasMany(() => Branch)
  branch: Branch[]

  @HasMany(() => Events)
  events: Events[]
}
