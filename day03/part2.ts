import * as fs from 'fs';

const digitsRegex = /\d+/dg;

const result: number[] = [];
const linesArray = fs.readFileSync('day3/input.txt', 'utf-8').split(/\n/);

// add padding
linesArray.push(
  Array(linesArray[0].length)
    .fill('.')
    .reduce((acc, curr) => acc + curr)
);
linesArray.unshift(
  Array(linesArray[0].length)
    .fill('.')
    .reduce((acc, curr) => acc + curr)
);

for (let i = 0; i < linesArray.length; i++) {
  const currLine = linesArray[i];

  let currAdjacentNumbers: number[] = [];
  for (let j = 0; j < currLine.length; j++) {
    const currChar = currLine[j];

    if (currChar === '*') {
      let stringSlice: string, match: RegExpMatchArray | null;

      // check left
      stringSlice = currLine.slice(Math.max(0, j - 3), j);
      match = stringSlice.match(/\d+$/);
      if (match) {
        currAdjacentNumbers.push(+match[0]);
      }

      // check right
      stringSlice = currLine.slice(j + 1, j + 4);
      match = stringSlice.match(/^\d+/);
      if (match) {
        currAdjacentNumbers.push(+match[0]);
      }

      // check prev and next lines
      const prevLine = linesArray[i - 1];
      const nextLine = linesArray[i + 1];
      let execArr;
      let matchesArr: { val: any; indices: any[] }[] = [];

      while ((execArr = digitsRegex.exec(prevLine)) !== null) {
        matchesArr.push({
          val: execArr[0],
          indices: execArr.indices ? execArr.indices[0] : [],
        });
      }

      matchesArr.forEach((match) => {
        if (match.indices[0] <= j + 1 && match.indices[1] >= j) {
          currAdjacentNumbers.push(+match.val);
        }
      });

      digitsRegex.lastIndex = 0;
      matchesArr = [];
      execArr = null;

      while ((execArr = digitsRegex.exec(nextLine)) !== null) {
        matchesArr.push({
          val: execArr[0],
          indices: execArr.indices ? execArr.indices[0] : [],
        });
      }

      matchesArr.forEach((match) => {
        if (match.indices[0] <= j + 1 && match.indices[1] >= j) {
          currAdjacentNumbers.push(+match.val);
        }
      });

      if (currAdjacentNumbers.length === 2) {
        result.push(currAdjacentNumbers[0] * currAdjacentNumbers[1]);
      }

      currAdjacentNumbers = [];
    }
  }
}

console.log(result.reduce((acc, curr) => acc + curr, 0));
