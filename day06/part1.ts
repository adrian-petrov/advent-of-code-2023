import * as fs from 'fs';

const linesArr = fs.readFileSync('day6/input.txt', 'utf-8').split('\n');
const timeAndRecordArr: number[][] = [];
const result: number[] = [];

linesArr[0]
  .split(/\s+/)
  .slice(1)
  .forEach((n) => timeAndRecordArr.push([+n]));
linesArr[1]
  .split(/\s+/)
  .slice(1)
  .forEach((n, idx) => timeAndRecordArr[idx].push(+n));

for (const [time, record] of timeAndRecordArr) {
  let ways = 0;
  for (let i = time - 1; i > 0; i--) {
    if (i * (time - i) > record) {
      ways++;
    }
  }
  result.push(ways);
}

console.log(result.reduce((acc, curr) => acc * curr, 1));
