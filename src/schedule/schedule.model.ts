import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/users.model";

interface ScheduleCreationAttr {
  idxCell: number;
  idxRow: number;
  groupId: number;
  studentId: number;
  userId: number;
  schoolId: number;
  classRoomId: number;
  branchId: number;
}
@Table({
  tableName: 'schedules'
})
export class Schedule extends Model<Schedule, ScheduleCreationAttr> {

  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: '1', description: 'Индекс ячейки'})
  @Column({type: DataType.INTEGER})
  idxCell: number;

  @ApiProperty({example: '2', description: 'Индекс строчки'})
  @Column({type: DataType.INTEGER})
  idxRow: number;


  @ApiProperty({example: '13', description: 'Id группового предмета'})
  @Column({type: DataType.INTEGER, allowNull: true})
  groupId: number;

  @ApiProperty({example: '2', description: 'Id студента'})
  @Column({type: DataType.INTEGER,  allowNull: true})
  studentId: number;

  @ApiProperty({example: '1', description: 'Id школы (ищем адрес)'})
  @Column({type: DataType.INTEGER,  allowNull: true})
  schoolId: number;

  @ApiProperty({example: '2', description: 'Id филиала школы (ищем адрес)'})
  @Column({type: DataType.INTEGER,  allowNull: true})
  branchId: number;

  @ApiProperty({example: '12', description: 'Id класса/кабинета'})
  @Column({type: DataType.INTEGER,  allowNull: true})
  classRoomId: number;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  userId: number;

  @BelongsTo(() => User )
  schedule: User
}
