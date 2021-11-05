import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { School } from "../schools/school.model";

interface EventsCreationAttr {
  musicalBranchId: number;
  date: Date;
  indDay: number;
  indWeek: number;
  month: number;
  time: string;
  title: string;
  typeId: number;
  schoolId: number;
}
@Table({
  tableName: 'events'
})
export class Events extends Model<Events, EventsCreationAttr> {

  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: '2', description: 'Народное отделение'})
  @Column({type: DataType.INTEGER, allowNull: false})
  musicalBranchId: number;

  @ApiProperty({example: '2021/08/12', description: 'Дата мероприятия'})
  @Column({type: DataType.DATE, allowNull: false})
  date: Date;


  @ApiProperty({example: '3', description: 'Индекс дня'})
  @Column({type: DataType.INTEGER})
  indDay: number;

  @ApiProperty({example: '3', description: 'Индекс недели'})
  @Column({type: DataType.INTEGER})
  indWeek: number;

  @ApiProperty({example: '1', description: 'Январь'})
  @Column({type: DataType.INTEGER})
  month: number;

  @ApiProperty({example: '18:00', description: 'Время проведенеия мероприятия'})
  @Column({type: DataType.STRING})
  time: string;

  @ApiProperty({example: 'Праздник первого концерта', description: 'Название мероприятия'})
  @Column({type: DataType.STRING})
  title: string;

  @ApiProperty({example: '2', description: 'Зачет/экзамен/концерт'})
  @Column({type: DataType.INTEGER})
  typeId: number;

  @ForeignKey(() => School)
  @Column({type: DataType.INTEGER})
  schoolId: number;

  @BelongsTo(() => School )
  school: School
}
