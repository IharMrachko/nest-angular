import { RoleInterface } from "./role.interface";
import { StudentInterface } from "./student.interface";

export interface TeacherInterface {
  id?: number,
  schoolId: number;
  email: string
  firstName: string;
  lastName: string;
  thridName: string;
  phone: string;
  banReason?: any;
  banned?: boolean;
  createdAt?: Date;
  electronicJournal?: [];
  groupSpecialization?: any[];
  individual_specializationId?: number;
  isDirectory?: boolean;
  posts?: any[];
  schedule?: any[];
  roles: RoleInterface[],
  school?: object;
  students?: StudentInterface[];
}
