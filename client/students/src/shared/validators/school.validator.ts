import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function schoolValidator(school: any[]): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {

    const value = control.value;
    if (!value) {
      return null;
    }
    const filterValue = value.toLowerCase();
    // @ts-ignore
    const filterSchool = school?.filter(option => option.fullAddress.toLowerCase() === filterValue.toLowerCase());

    const schoolValidator = !!filterSchool?.length;


    return !schoolValidator ? {schoolValidator:true}: null;
  }
}
