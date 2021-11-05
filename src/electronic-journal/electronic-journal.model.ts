import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/users.model";

interface ElectronicJournalCreationAttr {
  dates: any[];
  studentId: any[];
  appraisals?: any[];
  userId: number;
  schoolId: number;
  quarter: number;
}
@Table({
  tableName: 'electronicJournal'
})
export class ElectronicJournal extends Model<ElectronicJournal, ElectronicJournalCreationAttr> {

  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: '23/03/2021', description: 'Даты'})
  @Column({type: DataType.JSON})
  dates: any[];

  @ApiProperty({example: '2', description: 'Id студента'})
  @Column({type: DataType.JSON})
  studentId: any[];

  @ApiProperty({example: '2', description: 'Оценки студента'})
  @Column({type: DataType.JSON})
  appraisals: any[];

  @ApiProperty({example: '1', description: 'Id школы'})
  @Column({type: DataType.INTEGER,  allowNull: true})
  schoolId: number;

  @ApiProperty({example: 'I', description: 'I Четверть'})
  @Column({type: DataType.INTEGER,  allowNull: true})
  quarter: number;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  userId: number;

  @BelongsTo(() => User )
  electronicJournal: User
}
