import * as fs from 'fs';

const linesArray = fs.readFileSync('day4/input.txt', 'utf-8').split(/\n/);

const cardsMap = new Map<number, number>();
for (let i = 0; i < linesArray.length; i++) {
  cardsMap.set(i, 1);
}

const set = new Set<number>();
for (let i = 0; i < linesArray.length; i++) {
  const currLine = linesArray[i];

  const winningNumbers =
    currLine
      .slice(currLine.indexOf(':') + 2, currLine.indexOf('|') - 1)
      .match(/\d+/g)
      ?.slice() ?? [];
  const givenNumbers =
    currLine
      .slice(currLine.indexOf('|') + 2)
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

    let nextIdx = i + 1;
    for (let j = 0; j < diff; j++) {
      const currCardCount = cardsMap.get(i)!;
      cardsMap.set(nextIdx, cardsMap.get(nextIdx)! + currCardCount);
      nextIdx++;
    }
  }
  set.clear();
}

console.log(Array.from(cardsMap.values()).reduce((acc, curr) => acc + curr, 0));
