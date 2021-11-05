import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface UploadCreationAttr {
  fileName: string;
  file: any;
}

@Table({
  tableName: 'files'
})
export class Upload extends Model<Upload, UploadCreationAttr> {

  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: 'App.pdf', description: 'имя файла'})
  @Column({type: DataType.STRING,  allowNull: false})
  fileName: string;

  @ApiProperty({example: 'data: App....', description: 'Файл в Base64'})
  @Column({type: DataType.TEXT, allowNull: false})
  file: any;
}
