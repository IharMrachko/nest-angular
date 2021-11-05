import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./users.model";
import { UserDto } from "./dto/user.dto";
import { RolesService } from "../roles/roles.service";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import { GroupSpecializationService } from "../group-specialization/group-specialization.service";
import { UserGroupSpecialization } from "./user-group-specialization.model";
import { UserRoles } from "../roles/user-roles.model";
import { UpdateUserDto } from "./dto/update-user.dto";
import { StudentsService } from "../students/students.service";
import { Student } from "../students/student.model";
import { GroupSpecialization } from "../group-specialization/group-specialization.model";
import { Sequelize } from "sequelize-typescript";


@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User,
              @InjectModel(UserRoles)  private userRolesRepo: typeof UserRoles,
              @InjectModel(UserGroupSpecialization) private userGroupSpecRepo: typeof UserGroupSpecialization,
              @InjectModel(Student) private studentRepo: typeof Student,
              @InjectModel(GroupSpecialization) private groupSpecializationRepo: typeof GroupSpecialization,
              private groupSpecializationService: GroupSpecializationService,
              private studentService: StudentsService,
              private sequelize: Sequelize,
              private roleService: RolesService) {
  }

  async createUser(userDto: UserDto): Promise<User> {
   try {
      return await this.sequelize.transaction(async (t) => {
        const user = await this.userRepository.create(userDto, {transaction: t});
        for (const roleVal of userDto.roles) {
          const role = await this.roleService.getRoleByValue(roleVal.value);
          await this.userRolesRepo.create({roleId: role.id, userId: user.id}, {transaction: t})
        }
        if (!!userDto.groupSpecializations?.length) {
          for (const groupSpecVal of userDto.groupSpecializations) {
              const groupId = await this.groupSpecializationRepo.create({
              userId: user.id,
              groupSpecializationId: groupSpecVal.groupSpecializationId
            }, {transaction: t})
              const group = await this.userGroupSpecRepo.create({
              groupSpecializationId: groupId.id,
              userId: user.id
            }, {transaction: t})
          }
        }
          return user;
      } )
    } catch (e) {
      throw new HttpException({message: e}, HttpStatus.BAD_REQUEST);
    }
  }

  async updateUserById(userId: number, userUpdate: UpdateUserDto) {
    const update = {
      email: userUpdate.email,
      phone: userUpdate.phone,
      firstName: userUpdate.firstName,
      lastName: userUpdate.lastName,
      thridName: userUpdate.thridName,
      isDirectory: userUpdate.isDirectory,
      individual_specializationId: userUpdate.individual_specializationId
    }
    try {
      return await this.sequelize.transaction(async (t) => {
        const user = await this.userRepository.update({...update}, { where: {id: userId }, transaction: t });
        const students = await this.studentService.getAllStudentsByTeacherId(userId);
        students.forEach(stud => {
          this.studentRepo.update({instrumentKindId: userUpdate.individual_specializationId}, { where: {teacherId: userId }, transaction: t});
        })
        if (!!userUpdate.groupSpecializations.length) {
          await this.groupSpecializationRepo.destroy({ where: {userId}, transaction: t});
          await this.userGroupSpecRepo.destroy({ where: {userId}, transaction: t});
          for (const groupSpecVal of userUpdate.groupSpecializations) {
            const groupId = await this.groupSpecializationRepo.create({userId: userId, groupSpecializationId: groupSpecVal.groupSpecializationId}, {transaction: t})
            await this.userGroupSpecRepo.create({groupSpecializationId: groupId.id, userId: userId}, {transaction: t})
          }
        }
        return user;
      })

    } catch (e) {
      throw new HttpException({message: e}, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllUser(): Promise<User[]> {
    return  await this.userRepository.findAll({include: {all: true}});
  }

  async getAllUserBySchoolId(schoolId: string): Promise<User[]> {
     return await this.userRepository.findAll({where: {schoolId}, include: {all: true}, attributes: {exclude: ['password']}});
  }

  async getUserById(userId: string): Promise<User> {
    return await this.userRepository.findOne({where: {id: userId}, include: {all: true}, attributes: {exclude: ['password']}});
  }


  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({where: {email}, include: {all: true}});
  }

  async setRole(roleDto: AddRoleDto) {
    const user = await this.userRepository.findByPk(roleDto.userId);
    const role = await this.roleService.getRoleByValue(roleDto.value);
    if (role && user) {
      await user.$add('role', role.id);
      return roleDto;
    }
    throw new HttpException('Пользоваетль или роль не найдены', HttpStatus.NOT_FOUND)
  }

  async banUser(banUserDto: BanUserDto) {
    const user = await this.userRepository.findByPk(banUserDto.userId);
    if (!user) {
      throw new HttpException('Пользоваетль не найден', HttpStatus.NOT_FOUND)
    }
    user.banned = true;
    user.banReason = banUserDto.banReason;
    await user.save();
    return user;
  }
}
