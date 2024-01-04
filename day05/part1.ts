import * as fs from 'fs';

type TMapping =
  | 'seed-to-soil'
  | 'soil-to-fertilizer'
  | 'fertilizer-to-water'
  | 'water-to-light'
  | 'light-to-temperature'
  | 'temperature-to-humidity'
  | 'humidity-to-location';

type TMap = {
  range: [number, number];
  offset: number;
};

const maps: Record<TMapping, TMap[]> = {
  'seed-to-soil': [],
  'soil-to-fertilizer': [],
  'fertilizer-to-water': [],
  'water-to-light': [],
  'light-to-temperature': [],
  'temperature-to-humidity': [],
  'humidity-to-location': [],
};

const inputArray = fs.readFileSync('day5/input.txt', 'utf-8').split(/\n/);

const seeds = inputArray[0].match(/\d+/g)?.slice()!;

const inputMapsArray = inputArray.slice(2);

let currMapIdx = 0;
for (let i = 0; i < inputMapsArray.length; i++) {
  const currLine = inputMapsArray[i];

  if (currLine === '') {
    currMapIdx++;
    continue;
  }

  const ptrIdx = {
    currMapNumbersIdx: 0,
  };

  if (/^\D/.test(currLine)) {
    parseMap(ptrIdx, i, currMapIdx, inputMapsArray);
    i = ptrIdx.currMapNumbersIdx - 1;
  }
}

function parseMap(ptrIdx: { currMapNumbersIdx: number }, i: number, currMapIdx: number, arr: string[]): void {
  ptrIdx.currMapNumbersIdx = i + 1;

  while (arr[ptrIdx.currMapNumbersIdx] !== '') {
    const [dest, source, range] = arr[ptrIdx.currMapNumbersIdx].match(/\d+/g)?.slice()!;

    switch (currMapIdx) {
      case 0:
        maps['seed-to-soil'].push({
          range: [Number(source), Number(source) + Number(range)],
          offset: Number(dest) - Number(source),
        });
        break;

      case 1:
        maps['soil-to-fertilizer'].push({
          range: [Number(source), Number(source) + Number(range)],
          offset: Number(dest) - Number(source),
        });
        break;

      case 2:
        maps['fertilizer-to-water'].push({
          range: [Number(source), Number(source) + Number(range)],
          offset: Number(dest) - Number(source),
        });
        break;

      case 3:
        maps['water-to-light'].push({
          range: [Number(source), Number(source) + Number(range)],
          offset: Number(dest) - Number(source),
        });
        break;

      case 4:
        maps['light-to-temperature'].push({
          range: [Number(source), Number(source) + Number(range)],
          offset: Number(dest) - Number(source),
        });
        break;

      case 5:
        maps['temperature-to-humidity'].push({
          range: [Number(source), Number(source) + Number(range)],
          offset: Number(dest) - Number(source),
        });
        break;

      case 6:
        maps['humidity-to-location'].push({
          range: [Number(source), Number(source) + Number(range)],
          offset: Number(dest) - Number(source),
        });
        break;

      default:
        break;
    }

    ptrIdx.currMapNumbersIdx++;
  }
}

let minLocation = Number.MAX_VALUE;
seeds.forEach((seed) => {
  const soilOffset = maps['seed-to-soil'].find((map) => {
    if (map.range[0] <= +seed && +seed <= map.range[1]) {
      return true;
    }
    return false;
  });
  const soil = Number(seed) + (soilOffset ? soilOffset.offset : 0);

  const fertiliserOffset = maps['soil-to-fertilizer'].find((map) => {
    if (map.range[0] <= soil && soil <= map.range[1]) {
      return true;
    }
    return false;
  });
  const fertiliser = soil + (fertiliserOffset ? fertiliserOffset.offset : 0);

  const waterOffset = maps['fertilizer-to-water'].find((map) => {
    if (map.range[0] <= fertiliser && fertiliser <= map.range[1]) {
      return true;
    }
    return false;
  });
  const water = fertiliser + (waterOffset ? waterOffset.offset : 0);

  const lightOffset = maps['water-to-light'].find((map) => {
    if (map.range[0] <= water && water <= map.range[1]) {
      return true;
    }
    return false;
  });
  const light = water + (lightOffset ? lightOffset.offset : 0);

  const temperatureOffset = maps['light-to-temperature'].find((map) => {
    if (map.range[0] <= light && light <= map.range[1]) {
      return true;
    }
    return false;
  });
  const temperature = light + (temperatureOffset ? temperatureOffset.offset : 0);

  const humidityOffset = maps['temperature-to-humidity'].find((map) => {
    if (map.range[0] <= temperature && temperature <= map.range[1]) {
      return true;
    }
    return false;
  });
  const humidity = temperature + (humidityOffset ? humidityOffset.offset : 0);

  const locationOffset = maps['humidity-to-location'].find((map) => {
    if (map.range[0] <= humidity && humidity <= map.range[1]) {
      return true;
    }
    return false;
  });
  const location = humidity + (locationOffset ? locationOffset.offset : 0);

  minLocation = Math.min(minLocation, location);
});

console.log(minLocation);
