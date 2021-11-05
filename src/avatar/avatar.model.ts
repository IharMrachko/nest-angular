import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/users.model";

interface AvatarCreationAttr {
  userId: number;
  image: string;
}
@Table({
  tableName: 'avatars'
})
export class Avatar extends Model<Avatar, AvatarCreationAttr> {

  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;


  @ApiProperty({example: 'image.jpg', description: 'Изображение'})
  @Column({type: DataType.STRING})
  image: string;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  userId: number;

  @BelongsTo(() => User )
  avatar: User
}
