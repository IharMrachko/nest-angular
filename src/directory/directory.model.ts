import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Kind } from "../kind/kind.model";

interface DirectoryCreationAttr {
  code: string;
  name: string;
 }
@Table({
  tableName: 'directory'
})
export class Directory extends Model<Directory, DirectoryCreationAttr> {

  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: 'TRAINING_PERIOD', description: 'Код справочника'})
  @Column({type: DataType.STRING,  allowNull: false})
  code: string;

  @ApiProperty({example: 'Срок обучения', description: 'Название справочника'})
  @Column({type: DataType.STRING, allowNull: false})
  name: string;

  @HasMany(() => Kind)
  kinds: Kind[]

}
