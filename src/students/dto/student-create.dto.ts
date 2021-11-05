import { ParentCreateDto } from "../../parents/dto/parent-create.dto";

export class StudentCreateDto {
  readonly lastName: string;
  readonly firstName: string;
  readonly thridName: string;
  readonly dateBirthday: Date;
  readonly yearOfAdmission: number;
  readonly parents?: ParentCreateDto[];
  readonly schoolId: number;
  readonly trainingPeriodKindId: number;
  readonly instrumentKindId: number;
  readonly address: string;
  readonly secondary_school_number: number;
  readonly general_information: string;
  readonly teacherId: number;
}


