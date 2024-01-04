import * as fs from 'fs';

const linesArr = fs.readFileSync('day6/input.txt', 'utf-8').split('\n');
const timeAndRecord = [+linesArr[0].split(/\s+/).slice(1).join(''), +linesArr[1].split(/\s+/).slice(1).join('')];

let ways = 0;
for (let i = timeAndRecord[0] - 1; i > 0; i--) {
  if (i * (timeAndRecord[0] - i) > timeAndRecord[1]) {
    ways++;
  }
}

console.log(ways);
