export function abbreviationHelper(firsName: string, thridName: string): string {
  let first = firsName.split('').shift();
  let second = thridName.split('').shift();
  return first + '.' + second + '.';
}
