export const getClassNumberHelper =  function  (yearOfAdmission: number, trainingPeriod: string): string {
  let trainingPeriodToNumber;
  switch (trainingPeriod) {
    case 'Пятилетний':
      trainingPeriodToNumber = 5;
      break;
    case 'Семилетний':
      trainingPeriodToNumber = 7;
      break;
  }

  let month = new Date().getMonth();
  let date = new Date().getFullYear();
  let classNumber = date - yearOfAdmission;

  // @ts-ignore
  if (classNumber > trainingPeriodToNumber) {
    return 'окончил'
  }
  // if (classNumber === trainingPeriodToNumber) {
  //   if (month < 9) {
  //     return classNumber + ` (${trainingPeriodToNumber})` + ' выпускник'
  //   }
  // }
  if (classNumber === 0) {
    return 1 + ` (${trainingPeriodToNumber})`;
  }
  if (month >= 9) {
    return classNumber + 1 + ` (${trainingPeriodToNumber})`;
  }
  return classNumber + ` (${trainingPeriodToNumber})`;
};
