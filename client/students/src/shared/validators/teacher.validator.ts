import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';


export function teacherValidator(teachers: any[]): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {

    const value = control.value;
    if (!value) {
      return null;
    }
    const filterValue = value.toLowerCase();
    // @ts-ignore
    const filterTeacher = teachers?.filter(option => option.fullName.toLowerCase() === filterValue.toLowerCase());

    const teachersValidator = !!filterTeacher?.length;


    return !teachersValidator ? {teachersValidator:true}: null;
  }
}
