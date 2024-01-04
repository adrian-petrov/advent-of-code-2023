import * as fs from 'fs';

const result: number[] = [];
const linesArray = fs.readFileSync('day4/input.txt', 'utf-8').split(/\n/);

const set = new Set<number>();
linesArray.forEach((line) => {
  const winningNumbers =
    line
      .slice(line.indexOf(':') + 2, line.indexOf('|') - 1)
      .match(/\d+/g)
      ?.slice() ?? [];
  const givenNumbers =
    line
      .slice(line.indexOf('|') + 2)
      .match(/\d+/g)
      ?.slice() ?? [];

  givenNumbers?.forEach((gNumber) => set.add(+gNumber));
  winningNumbers?.forEach((wNumber) => {
    if (set.has(+wNumber)) {
      set.delete(+wNumber);
    }
  });

  if (givenNumbers.length > set.size) {
    const diff = givenNumbers.length - set.size;
    const points = Array(diff)
      .fill(0)
      .reduce((acc, _, currIdx) => (currIdx === 0 ? acc + 1 : acc * 2), 0);
    result.push(points);
  }
  set.clear();
});

console.log(result.reduce((acc, curr) => acc + curr, 0));
