import * as fs from 'fs';

const linesArr = fs.readFileSync('day9/input.txt', 'utf-8').split('\n');
const result: { lastElements: number[] }[] = Array(linesArr.length).fill({});

for (let i = 0; i < linesArr.length; i++) {
  const line = linesArr[i].split(' ').map((n) => +n);
  let j = 0,
    temp = line,
    tempArr: number[] = [];

  while (!temp.every((n) => n === 0) && j < temp.length) {
    tempArr.push(temp[j + 1] - temp[j]);
    j++;

    if (j === temp.length - 1) {
      result[i] = {
        lastElements: result[i].lastElements ? [...result[i].lastElements, temp[j]] : [temp[j]],
      };

      temp = tempArr;
      tempArr = [];
      j = 0;
    }
  }
}

console.log(
  result.reduce((acc, curr) => {
    return acc + curr.lastElements.reduce((_acc, _curr) => _acc + _curr, 0);
  }, 0)
);
