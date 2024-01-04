import * as fs from 'fs';

const ltrRegex = /(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)|([0-9])/g;
const rtlRegex = /(eno)|(owt)|(eerht)|(ruof)|(evif)|(xis)|(neves)|(thgie)|(enin)|([0-9])/g;

const lettersToDigits: { [key: string]: number } = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  eno: 1,
  owt: 2,
  eerht: 3,
  ruof: 4,
  evif: 5,
  xis: 6,
  neves: 7,
  thgie: 8,
  enin: 9,
};

const result: number[] = [];
const linesArray = fs.readFileSync('day1/input.txt', 'utf-8').split(/\n/);

linesArray.forEach((line) => {
  const digitsTuple: [number | null, number | null] = [null, null];

  let matches = line.match(ltrRegex);
  if (matches && matches.length > 0) {
    digitsTuple[0] = /\d/.test(matches[0]) ? +matches[0] : lettersToDigits[matches[0]];
  }

  let reversedString = '';
  for (let i = line.length - 1; i >= 0; i--) {
    reversedString += line[i];
  }

  matches = reversedString.match(rtlRegex);
  if (matches && matches.length > 0) {
    digitsTuple[1] = /\d/.test(matches[0]) ? +matches[0] : lettersToDigits[matches[0]];
  }

  result.push(+digitsTuple.toString().replace(',', ''));
});

console.log(result.reduce((acc, curr) => acc + curr, 0));
