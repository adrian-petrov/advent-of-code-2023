import * as fs from 'fs';

type TCubeColours = {
  r: number; // 12
  g: number; // 13
  b: number; // 14
};

type TGame = {
  [id: number]: TCubeColours;
};

const result: TGame[] = [];
const linesArray = fs.readFileSync('day2/input.txt', 'utf-8').split(/\n/);

linesArray.forEach((line) => {
  result.push(parseLine(line));
});

console.log(
  result.reduce((acc, curr) => {
    const values = Object.values(curr)[0];
    return acc + values.r * values.g * values.b;
  }, 0)
);

function parseLine(line: string): TGame {
  const id = +line.slice(5, line.indexOf(':'));
  const cubesTotals = getCubesTotals(line.slice(line.indexOf(':') + 1));

  function getCubesTotals(line: string): TCubeColours {
    const result: { [key: string]: number } = {
      r: 0,
      g: 0,
      b: 0,
    };

    const sets = line.split(';');
    sets.forEach((set) => {
      set
        .trim()
        .split(',')
        .forEach((cubesSet) => {
          const [num, type] = cubesSet.trim().split(' ');
          result[type[0]] = Math.max(result[type[0]], +num);
        });
    });

    return <TCubeColours>result;
  }

  return {
    [id]: {
      ...cubesTotals,
    },
  };
}
