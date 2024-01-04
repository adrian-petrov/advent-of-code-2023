import * as fs from 'fs';

const linesArr = fs.readFileSync('day11/test-input.txt', 'utf-8').split('\n');

const emptyRows = linesArr.map((r, rIdx) => (!r.includes('#') ? rIdx : null)).filter((r) => r);
const emptyCols = linesArr[0]
  .split('')
  .map((_, cIdx) => linesArr.map((r) => r[cIdx]))
  .map((c, idx) => (!c.includes('#') ? idx : null))
  .filter((c) => c);
const galaxiesCoords: [number, number][] = [];

for (let r = 0; r < linesArr.length; r++) {
  for (let c = 0; c < linesArr.length; c++) {
    if (linesArr[r][c] === '#') {
      galaxiesCoords.push([r, c]);
    }
  }
}

let total = 0;
for (let i = 0; i < galaxiesCoords.length; i++) {
  for (let j = 0; j < i; j++) {
    for (let k = Math.min(galaxiesCoords[i][0], galaxiesCoords[j][0]); k < Math.max(galaxiesCoords[i][0], galaxiesCoords[j][0]); k++) {
      // part 1
      // total += emptyRows.includes(k) ? 2 : 1;
      // part 2
      total += emptyRows.includes(k) ? 1000000 : 1;
    }
    for (let k = Math.min(galaxiesCoords[i][1], galaxiesCoords[j][1]); k < Math.max(galaxiesCoords[i][1], galaxiesCoords[j][1]); k++) {
      // part 1
      // total += emptyCols.includes(k) ? 2 : 1;
      // part 2
      total += emptyCols.includes(k) ? 1000000 : 1;
    }
  }
}
