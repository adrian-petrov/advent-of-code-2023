import * as fs from 'fs';

const linesArr = fs.readFileSync('day9/input.txt', 'utf-8').split('\n');
const result: { firstElements: number[] }[] = Array(linesArr.length).fill({});

for (let i = 0; i < linesArr.length; i++) {
  const line = linesArr[i].split(' ').map((n) => +n);
  let j = 0,
    temp = line,
    tempArr: number[] = [];

  while (!temp.every((n) => n === 0) && j < temp.length) {
    if (j === 0) {
      result[i] = {
        firstElements: result[i].firstElements ? [...result[i].firstElements, temp[j]] : [temp[j]],
      };
    }

    tempArr.push(temp[j + 1] - temp[j]);
    j++;

    if (j === temp.length - 1) {
      temp = tempArr;
      tempArr = [];
      j = 0;
    }
  }
}

console.log(
  result.reduce((acc, curr) => {
    return acc + curr.firstElements.slice(0, curr.firstElements.length - 1).reduceRight((_acc, _curr) => _curr - _acc, curr.firstElements.at(-1)!);
  }, 0)
);
