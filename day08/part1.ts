import * as fs from 'fs';

const linesArr = fs.readFileSync('day8/test-input.txt', 'utf-8').split('\n');

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

let steps = 1,
  instructionIdx = 0,
  element = '',
  instruction = '';

const [left, right] = nodesMap['AAA'];
instruction = instructions[instructionIdx] === 'L' ? left : right;
element = instruction;
while (element !== 'ZZZ') {
  steps++;
  instructionIdx++;

  if (instructionIdx === instructions.length) {
    instructionIdx = 0;
  }

  const [left, right] = nodesMap[element];
  instruction = instructions[instructionIdx] === 'L' ? left : right;
  element = instruction;
}

console.log(steps);
