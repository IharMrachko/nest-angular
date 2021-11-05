export interface StudentInterface {
  lastName: string;
  firstName: string;
  thridName: string;
  dateBirthday: Date;
  yearOfAdmission: number;
  parents?: ParentInterface[];
  schoolId: number;
  trainingPeriodKindId: number;
  instrumentKindId: number;
  address: string;
  secondary_school_number: number;
  general_information: string;
}

export interface ParentInterface {
  lastName: string;
  firstName: string;
  thridName: string;
  phone: string;
  studentId: number;
}
