import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";
import { GroupSpecializationDto } from "../../group-specialization/dto/group-specialization-dto";
import { CreateRoleDto } from "../../roles/dto/create-role.dto";

export class UserDto {
  @ApiProperty({example: 'email@email.com', description: 'Email'})
  @IsString()
  @IsEmail({}, {message: 'Некорректный email'})
  readonly email: string;

  @ApiProperty({example: '123456', description: 'Пароль'})
  @IsString({message: 'Должен быть строкой'})
  @Length(4, 10, {message: 'Не менее 4 и не более 10 символов'})
  readonly password: string

  @ApiProperty({example: 'Шабловская', description: 'Фамилия'})
  @IsString({message: 'Должен быть строкой'})
  readonly lastName: string;

  @ApiProperty({example: 'Надежда', description: 'Имя'})
  @IsString({message: 'Должен быть строкой'})
  readonly firstName: string;

  @ApiProperty({example: 'Павловна', description: 'Отчество'})
  @IsString({message: 'Должен быть строкой'})
  readonly thridName: string;

  @ApiProperty({example: '+375298165212', description: 'Номер телефона'})
  @IsString({message: 'Должен быть строкой'})
  readonly phone: string;

  readonly individual_specializationId: number;

  readonly roles: CreateRoleDto[];

  readonly groupSpecializations: GroupSpecializationDto[];

  readonly isDirectory: boolean;
}
