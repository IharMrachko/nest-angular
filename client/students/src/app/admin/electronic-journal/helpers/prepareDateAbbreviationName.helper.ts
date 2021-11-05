export function prepareDateAbbreviationName(dates: Set<any>): string {
  let abbr = []
  for (const date of dates.values()) {
    switch (date) {
      case 'понедельник':
        abbr.push('Пн')
        break;
      case 'вторник':
        abbr.push('Вт')
        break;
      case 'среда':
        abbr.push('Ср')
        break;
      case 'четверг':
        abbr.push('Чт')
        break;
      case 'пятница':
        abbr.push('Пт')
        break;
      case 'суббота':
        abbr.push('Суб')
        break;
    }
  }
  return !!abbr.length ? abbr[0] + '-' + abbr[1] : '-----';
 }
