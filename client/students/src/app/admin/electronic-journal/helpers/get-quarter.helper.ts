export function getQuarterHelper(indexQuarter: number): string {
  switch (indexQuarter) {
    case 0:
      return 'I четверть';
      break;
    case 1:
      return 'II четверть';
      break;
    case 2:
      return 'III четверть';
      break;
    case 3:
      return 'IV четверть';
      break;
  }
}
