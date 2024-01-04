import * as fs from 'fs';

const linesArr = fs.readFileSync('day8/input.txt', 'utf-8').split('\n');

const instructions = linesArr[0];
const nodes = linesArr.slice(2);

const nodesMap: Record<string, [string, string]> = {};

for (let i = 0; i < nodes.length; i++) {
  const line = nodes[i];
  const node = line.slice(0, 3);
  const [left, right] = line
    .slice(line.indexOf('(') + 1, line.indexOf(')'))
    .split(',')
    .map((n) => n.trim());
  nodesMap[node] = [left, right];
}

const startingNodesArr = Object.entries(nodesMap).filter(([key, _]) => key[2] === 'A');
const result: number[][] = Array(startingNodesArr.length).fill([]);

for (let i = 0; i < startingNodesArr.length; i++) {
  let steps = 1,
    instructionIdx = 0,
    element = '',
    instruction = '',
    boundaryIdx = 0,
    maxIterations = 100000;

  const currNode = startingNodesArr[i][0];
  const [left, right] = nodesMap[currNode];
  instruction = instructions[instructionIdx] === 'L' ? left : right;
  element = instruction;

  while (element !== currNode && boundaryIdx < maxIterations) {
    steps++;
    instructionIdx++;
    boundaryIdx++;

    if (instructionIdx === instructions.length) {
      instructionIdx = 0;
    }

    const [left, right] = nodesMap[element];
    instruction = instructions[instructionIdx] === 'L' ? left : right;
    element = instruction;

    if (element[2] === 'Z') {
      result[i] = [...result[i], steps];
    }
  }
}

const sortedMinStepsArr = result.map((arr) => arr[0]).sort();

const gcd = (a: number, b: number): number => {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return Math.abs(a);
};

const lcm = (a: number, b: number): number => {
  return (a * b) / gcd(a, b);
};

const findLCM = (arr: number[]): number => {
  let result = arr[0];

  for (let i = 1; i < arr.length; i++) {
    result = lcm(result, arr[i]);
  }

  return result;
};

console.log(findLCM(sortedMinStepsArr));
