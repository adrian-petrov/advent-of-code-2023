import * as fs from 'fs';

class Queue<T> {
  private _queue: T[] = [];

  constructor(...args: T[]) {
    this._queue.push(...args);
  }

  public get count() {
    return this._queue.length;
  }

  public enqueue(item: T): void {
    this._queue.push(item);
  }

  public dequeue(): T | undefined {
    return this._queue.shift();
  }

  public peek(): T | undefined {
    return this._queue[0];
  }

  public clear(): void {
    this._queue = [];
  }

  public empty(): boolean {
    return this._queue.length > 0;
  }
}

type TDirection = 'UP' | 'RIGHT' | 'DOWN' | 'LEFT';
type TTile = '|' | '-' | 'L' | 'J' | '7' | 'F' | '.';
type TGridItem = {
  from: TDirection;
  row: number;
  col: number;
  step: number;
};

const linesArr = fs.readFileSync('day10/input.txt', 'utf-8').split('\n');
let grid: string[][] = Array(linesArr.length);

// rows
for (let i = 0; i < linesArr.length; i++) {
  const line = linesArr[i];
  grid[i] = Array(line.length).fill(null);

  // cols
  for (let j = 0; j < line.length; j++) {
    grid[i][j] = line[j];
  }
}

// starting point = [30, 72];
const queue = new Queue<TGridItem>({ from: 'DOWN', row: 29, col: 72, step: 1 }, { from: 'LEFT', row: 30, col: 73, step: 1 });
let curr: TGridItem | undefined,
  max = 0;
while ((curr = queue.dequeue()) !== undefined && grid[curr.row][curr.col] !== 'S') {
  const currTile = <TTile>grid[curr.row][curr.col];

  if (currTile === '.') {
    continue;
  }

  const dirsAndPipes = getValidDirectionAndPipes(curr.from, currTile);

  if (!dirsAndPipes) {
    continue;
  }

  const [dir, pipes] = dirsAndPipes;
  const nextDirCoords = move(curr, dir);
  const nextGridItem: TGridItem = { from: nextDirCoords[0], row: nextDirCoords[1][0], col: nextDirCoords[1][1], step: curr.step + 1 };

  if (grid[nextGridItem.row][nextGridItem.col] === 'S') {
    max = Math.max(max, nextGridItem.step);
  }

  if (pipes.includes(<TTile>grid[nextGridItem.row][nextGridItem.col])) {
    queue.enqueue(nextGridItem);
  }
}

console.log(max / 2);

function getValidDirectionAndPipes(from: TDirection, at: TTile): [TDirection, TTile[]] | null {
  if (from === 'UP') {
    switch (at) {
      case '|':
        return ['DOWN', ['|', 'L', 'J']];

      case 'L':
        return ['RIGHT', ['J', '-', '7']];

      case 'J':
        return ['LEFT', ['-', 'F', 'L']];

      case '-':
      case '7':
      case 'F':
        return null;

      default:
        return null;
    }
  } else if (from === 'RIGHT') {
    switch (at) {
      case '-':
        return ['LEFT', ['-', 'F', 'L']];

      case 'L':
        return ['UP', ['|', 'F', '7']];

      case 'F':
        return ['DOWN', ['|', 'J', 'L']];

      case '|':
      case 'J':
      case '7':
        return null;

      default:
        return null;
    }
  } else if (from === 'DOWN') {
    switch (at) {
      case '|':
        return ['UP', ['|', 'F', '7']];

      case '7':
        return ['LEFT', ['-', 'F', 'L']];

      case 'F':
        return ['RIGHT', ['-', 'J', '7']];

      case '-':
      case 'J':
      case 'L':
        return null;

      default:
        return null;
    }
  } else if (from === 'LEFT') {
    switch (at) {
      case '-':
        return ['RIGHT', ['-', '7', 'J']];

      case 'J':
        return ['UP', ['|', '7', 'F']];

      case '7':
        return ['DOWN', ['|', 'J', 'L']];

      case 'F':
      case 'L':
      case '|':
        return null;

      default:
        return null;
    }
  }

  return null;
}

function move(gridItem: TGridItem, to: TDirection): [TDirection, [number, number]] {
  switch (to) {
    case 'UP':
      return ['DOWN', [gridItem.row - 1, gridItem.col]];
    case 'RIGHT':
      return ['LEFT', [gridItem.row, gridItem.col + 1]];
    case 'DOWN':
      return ['UP', [gridItem.row + 1, gridItem.col]];
    case 'LEFT':
      return ['RIGHT', [gridItem.row, gridItem.col - 1]];
  }
}
