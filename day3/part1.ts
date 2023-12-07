import * as fs from 'fs';

const symbolsRegex = /[^0-9.]/;
const digitsRegex = /\d/;

const result: number[] = [];
const linesArray = fs.readFileSync('day3/test-input.txt', 'utf-8').split(/\n/);

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

  let currNumber: string = '';
  for (let j = 0; j < currLine.length; j++) {
    const currChar = currLine[j];

    if (digitsRegex.test(currChar)) {
      currNumber += currChar;

      // number at the end
      if (j === currLine.length - 1) {
        const numberStartIndex = j - currNumber.length + 1;
        const leftBoundIndex = numberStartIndex - 1;

        const prevLine = linesArray[i - 1];
        const nextLine = linesArray[i + 1];

        if (
          symbolsRegex.test(currLine[leftBoundIndex]) ||
          symbolsRegex.test(prevLine.slice(leftBoundIndex, j)) ||
          symbolsRegex.test(nextLine.slice(leftBoundIndex, j))
        ) {
          result.push(+currNumber);
          currNumber = '';
        }
      }

      continue;
    }

    // hit symbol or dot
    if (currNumber.length > 0) {
      const numberStartIndex = j - currNumber.length;
      const leftBoundIndex = Math.max(numberStartIndex - 1, 0);

      const prevLine = linesArray[i - 1];
      const nextLine = linesArray[i + 1];

      if (
        symbolsRegex.test(currLine[leftBoundIndex]) ||
        symbolsRegex.test(currChar) ||
        symbolsRegex.test(prevLine.slice(leftBoundIndex, j + 1)) ||
        symbolsRegex.test(nextLine.slice(leftBoundIndex, j + 1))
      ) {
        result.push(+currNumber);
      }

      currNumber = '';
    }
  }
}

console.log(result.reduce((acc, curr) => acc + curr, 0));
