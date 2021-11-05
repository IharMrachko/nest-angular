import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../roles/roles.model";
import { UserRoles } from "../roles/user-roles.model";
import { Avatar } from "../avatar/avatar.model";
import { School } from "../schools/school.model";
import { Student } from "../students/student.model";
import { GroupSpecialization } from "../group-specialization/group-specialization.model";
import { Schedule } from "../schedule/schedule.model";
import { ElectronicJournal } from "../electronic-journal/electronic-journal.model";

interface UserCreationAttr {
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  thridName: string;
  phone: string;
  isDirectory: boolean;
}
@Table({
  tableName: 'users'
})
export class User extends Model<User, UserCreationAttr> {

  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: 'email@email.com', description: 'Email'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  email: string;

  @ApiProperty({example: '123456', description: 'Пароль'})
  @Column({type: DataType.STRING, allowNull: false})
  password: string;


  @ApiProperty({example: 'Шабловская', description: 'Фамилия'})
  @Column({type: DataType.STRING,  allowNull: true})
  lastName: string;

  @ApiProperty({example: 'Надежда', description: 'Имя'})
  @Column({type: DataType.STRING, allowNull: true})
  firstName: string;

  @ApiProperty({example: 'Павловна', description: 'Отчесвто'})
  @Column({type: DataType.STRING, allowNull: true})
  thridName: string;

  @ApiProperty({example: '+375298123241', description: 'Номер телефона'})
  @Column({type: DataType.STRING, unique: true, allowNull: true})
  phone: string;

  @ApiProperty({example: 'Гитара', description: 'Инидивидуальный предмет'})
  @Column({type: DataType.INTEGER, allowNull: true})
  individual_specializationId: number;


  @ApiProperty({example: 'true', description: 'Является директором школы'})
  @Column({type: DataType.BOOLEAN, defaultValue: false})
  isDirectory: boolean;

  @ApiProperty({example: 'true', description: 'Забанен'})
  @Column({type: DataType.BOOLEAN, defaultValue: false})
  banned: boolean;

  @ApiProperty({example: 'матерился', description: 'Причина блокировки'})
  @Column({type: DataType.STRING, allowNull: true})
  banReason: string;

  @BelongsToMany(() => Role, () => UserRoles )
  roles: Role[]

  @HasMany(() => Avatar)
  avatars: Avatar[]

  @HasMany(() => Schedule)
  schedule: Schedule[]

  @HasMany(() => ElectronicJournal)
  electronicJournal: ElectronicJournal[]

  @HasMany(() => GroupSpecialization)
  groupSpecialization: GroupSpecialization[]

  @HasMany(() => Student)
  students: Student[]

  @ForeignKey(() => School)
  @Column({type: DataType.INTEGER})
  schoolId: number;

  @BelongsTo(() => School )
  school: School
}
