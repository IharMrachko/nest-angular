import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Directory } from "../directory/directory.model";

interface KindCreationAttr {
  value: string;
  type_code: number;
}
@Table({
  tableName: 'kind'
})
export class Kind extends Model<Kind, KindCreationAttr> {

  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: 'Срок обучения', description: 'Значение справочника'})
  @Column({type: DataType.STRING,  allowNull: false})
  value: string;

  @ForeignKey(() => Directory)
  @Column({type: DataType.INTEGER})
  type_code: number;

  @BelongsTo(() => Directory )
  kindDirectory: Directory

}
