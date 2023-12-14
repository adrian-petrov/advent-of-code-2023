import * as fs from 'fs';

const linesArr = fs.readFileSync('day7/input.txt', 'utf-8').split('\n');

const cards = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
const hands = ['high', 'one-pair', 'two-pair', 'three-of-a-kind', 'full-house', 'four-of-a-kind', 'five-of-a-kind'] as const;

type THand = (typeof hands)[number];
type THandAndBid = [string, number];

const result: number[] = [];

// First ordering
const cardsByRank: THandAndBid[][] = Array(hands.length).fill([]);
for (let i = 0; i < linesArr.length; i++) {
  const [hand, bid] = linesArr[i].split(' ');
  const handType = getHandType(hand);

  const idx = hands.indexOf(handType);
  cardsByRank[idx] = [...cardsByRank[idx], [hand, +bid]];
}

// Second ordering
for (let i = 0; i < cardsByRank.length; i++) {
  const handTypeArr = cardsByRank[i];
  handTypeArr.sort((a, b) => {
    const handA = a[0];
    const handB = b[0];

    if (handA[0] !== handB[0]) {
      return cards.indexOf(handA[0]) - cards.indexOf(handB[0]);
    }

    if (handA[1] !== handB[1]) {
      return cards.indexOf(handA[1]) - cards.indexOf(handB[1]);
    }

    if (handA[2] !== handB[2]) {
      return cards.indexOf(handA[2]) - cards.indexOf(handB[2]);
    }

    if (handA[3] !== handB[3]) {
      return cards.indexOf(handA[3]) - cards.indexOf(handB[3]);
    }

    if (handA[4] !== handB[4]) {
      return cards.indexOf(handA[4]) - cards.indexOf(handB[4]);
    }

    return 1;
  });
}

let rank = 1;
for (let i = 0; i < cardsByRank.length; i++) {
  for (let j = 0; j < cardsByRank[i].length; j++) {
    result.push(rank * cardsByRank[i][j][1]);
    rank++;
  }
}

console.log(result.reduce((acc, curr) => acc + curr, 0));

function getHandType(hand: string): THand {
  const occurrences: Record<string, number> = {};

  for (let i = 0; i < hand.length; i++) {
    if (!occurrences[hand[i]]) {
      occurrences[hand[i]] = 1;
    } else {
      occurrences[hand[i]]++;
    }
  }

  const sortedHandString = Object.entries(occurrences)
    .sort(([_, v1], [__, v2]) => (v1 > v2 ? -1 : 1))
    .map(([_, num]) => num)
    .join('');

  switch (sortedHandString) {
    case '11111':
      return 'high';
    case '2111':
      return 'one-pair';
    case '221':
      return 'two-pair';
    case '311':
      return 'three-of-a-kind';
    case '32':
      return 'full-house';
    case '41':
      return 'four-of-a-kind';
    case '5':
      return 'five-of-a-kind';
    default:
      return 'high';
  }
}
