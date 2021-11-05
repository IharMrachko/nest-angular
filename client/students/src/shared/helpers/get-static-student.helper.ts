
export const getStaticStudentHelper =  function  (students: any []): any {
  let studentConfig = [
    {label: '1(5)', classNumber: 1, period: 5, count: 0},
    {label: '2(5)', classNumber: 2, period: 5, count: 0},
    {label: '3(5)', classNumber: 3, period: 5, count: 0},
    {label: '4(5)', classNumber: 4, period: 5, count: 0},
    {label: '5(5)', classNumber: 5, period: 5, count: 0},
    {label: '1(7)', classNumber: 1, period: 7, count: 0},
    {label: '2(7)', classNumber: 2, period: 7, count: 0},
    {label: '3(7)', classNumber: 3, period: 7, count: 0},
    {label: '4(7)', classNumber: 4, period: 7,count: 0},
    {label: '5(7)', classNumber: 5, period: 7,count: 0},
    {label: '6(7)', classNumber: 6, period: 7,count: 0},
    {label: '7(7)', classNumber: 7, period: 7,count: 0},
    {label: 'выпускники', count: 0},
  ]
   // @ts-ignore
  const studentsMap = students.map(item => {
        let trainingPeriodToNumber;
        switch (item.trainingPeriod) {
          case 'Пятилетний':
            trainingPeriodToNumber = 5;
            break;
          case 'Семилетний':
            trainingPeriodToNumber = 7;
            break;
        }
        let month = new Date().getMonth();
        let date = new Date().getFullYear();
        let classNumber = date -  item.yearOfAdmission;
        if (classNumber === 0) {
          return {title: `1(${trainingPeriodToNumber})`, classNumber: 1, period: trainingPeriodToNumber };
        }
        if (month >= 9) {
         return {title: `${classNumber + 1}(${trainingPeriodToNumber})`, classNumber: classNumber + 1, period: trainingPeriodToNumber };
       }
         return {title: `${classNumber}(${trainingPeriodToNumber})`, classNumber: classNumber, period: trainingPeriodToNumber};

      });
  studentConfig = studentConfig.map(item => {
   let len = studentsMap.filter(val => val.classNumber === item.classNumber && val.period === item.period).length;
   return {...item, count: len}
  });

  let graduateCount = studentConfig
    .filter(item => (item.period === 7 && item.classNumber === 7) ||  (item.period === 5 && item.classNumber === 5))
    .reduce((total, amount) => {return total + amount.count}, 0);
  studentConfig = studentConfig.map(item => {
    if (item.label === 'выпускники') {
      return {...item, count: graduateCount}
    }
    return {...item}
  })

  return studentConfig;

}

export const totalStudent = (students: any[]): any => {
  return students.filter(item => item.label !== 'выпускники').reduce((total, amount) => {return total + amount.count}, 0);
}
