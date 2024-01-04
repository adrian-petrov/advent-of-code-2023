import * as fs from 'fs';

const result: number[] = [];
const linesArray = fs.readFileSync('day1/input.txt', 'utf-8').split(/\n/);

linesArray.forEach((line) => {
  const digitsTuple: [number | null, number | null] = [null, null];

  for (const char of line) {
    if (/\d/.test(char) && digitsTuple[0] === null) {
      digitsTuple[0] = +char;
    } else if (/\d/.test(char) && digitsTuple[0] !== null) {
      digitsTuple[1] = +char;
    }
  }

  if (digitsTuple[0] !== null && digitsTuple[1] === null) {
    digitsTuple[1] = digitsTuple[0];
  }

  result.push(+digitsTuple.toString().replace(',', ''));
});

console.log(result.reduce((acc, curr) => acc + curr, 0));
