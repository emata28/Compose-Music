import * as fs from 'fs';
// import { default as ft } from 'fourier-transform';
import * as WavDecoder from 'wav-decoder';
// import { complex as fft } from 'fft';
import * as WavEncoder from 'wav-encoder';
import { AMOUNT_OF_SONGS, BIT_RATE, BITS,
  LATTER_RATE, PATTERN_SIZE, S2_MULTIPLIER } from './library/consts';
import { Pattern } from './library/Patterns';
import { getSector } from './library/sector';
import { Song } from './library/song';

const sectorsS1: string[] = ['', ''];
const sectorsS2: string[] = ['', ''];
const infoChannels: Pattern[][] = [[], []];
const S1: string = process.argv[3];
const S2: string = process.argv[4];
const command: string = process.argv[2];

const readFile = (filepath: string) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, (err, buffer) => {
      if (err) {
        return reject(err);
      }
      return resolve(buffer);
    });
  });
};

  let rate = LATTER_RATE;
    rate = rate * 2;

  readFile(S2).then((buffer) => {
    return WavDecoder.decode(buffer);
  }).then(function (audioData) {
    let count = 0;
    for (let i = 0; i < audioData.channelData[0].length; i += rate) {
      const channel1 = getSector(audioData.channelData[0][i], audioData.channelData[0][i + rate]);
      const channel2 = getSector(audioData.channelData[1][i], audioData.channelData[1][i + rate]);
      sectorsS2[0] = sectorsS2[0] + channel1;
      sectorsS2[1] = sectorsS2[1] + channel2;

    }
    getForm(sectorsS2[0]);

    const sum: number[] = [0, 0];
      sectorsS2[0] = getForm(sectorsS2[0]);
      sectorsS2[1] = getForm(sectorsS2[1]);

  });




readFile(S1).then((buffer) => {
  return WavDecoder.decode(buffer);
}).then(function (audioData) {
  let count = 0;


  for (let i = 0; i < audioData.channelData[0].length; i += LATTER_RATE) {
    const channel1 = getSector(audioData.channelData[0][i], audioData.channelData[0][i + LATTER_RATE]);
    const channel2 = getSector(audioData.channelData[1][i], audioData.channelData[1][i + LATTER_RATE]);
    sectorsS1[0] = sectorsS1[0] + channel1;
    sectorsS1[1] = sectorsS1[1] + channel2;

    count++;

  }


    sectorsS1[0] = getForm(sectorsS1[0]);
    sectorsS1[1] = getForm(sectorsS1[1]);
     //const result = compose(audioData);
    // createFile(result[0], result[1], "$cmp.wav");
    Promise.resolve(compose(audioData))
      .then((result: Float32Array[]) => createFile(result[0], result[1], '$cmp.wav'));

});


function getForm(pSector: string): string {
  let temp: string = '';
  let cont = 0;
  let result = '';
  while (cont != pSector.length) {
    temp += pSector[cont];
    if (temp.length == 3) {
      if (temp.search('BS') != -1 || temp == 'PSP' || temp.search('SB') != -1) {
        result += 'P';
      } else if (temp.search('SP') != -1 || temp.search('PS') != -1) {
        result += 'M';
      } else if (temp.search('BP') != -1 || temp.search('PB') != -1) {
        result += 'V';
      } else if (temp == 'PPP') {
        result += 'L';
      } else if (temp == 'SSS') {
        result += 'S';
      } else if (temp == 'BBB') {
        result += 'B';
      } else if (temp.search('F') != -1) {
        result += 'F';

      }
      temp = '';
    }
    cont++;
  }
  return result;
}

async function compose(audioData: any) {
  const rangesS1 = [ranges(sectorsS1[0]), ranges(sectorsS1[1])];
  const rangesS2 = [ranges(sectorsS2[0]), ranges(sectorsS2[1])];
 // const elastic = new elastic_connection();
  const newLength = sectorsS2[0].length * S2_MULTIPLIER;
  let left: any[] = [];
  let right: any[] = [];
  const result: Float32Array[] = [];
  const gen = 0;
  let songs = getInitialSongs(rangesS1, AMOUNT_OF_SONGS, newLength);
  // await Promise.all([elastic.createIndex("left"), elastic.createIndex("right")]);
  do {
    left = [];
    right = [];
    const Queries = getElasticQueries([rangesS2[0][0], rangesS2[1][0]], [rangesS2[0][3], rangesS2[1][3]], songs, gen);
    /*await Promise.all([
      elastic.deleteData("left")
    ]);*/
    //await Promise.all([elastic.sendData(Queries)]);

    // break;
  /*  await Promise.all([elastic.getData('left'),
      elastic.getData('right')], // ${gen}
    );*/
    // console.log("esto debe salir despues de 20 results");

    // gen++;
   // left = elastic.getInfo(0);
   // right = elastic.getInfo(1);
    const newSongs: Song[] = [];
    // console.log(left.length, right.length);

    for (let song = 0; newSongs.length < AMOUNT_OF_SONGS; song++) {
      /*if (song < left.length) {
        newSongs.push(songs[song]);
      } else {*/
      const rand1 = Math.round(Math.random() * (left.length - 1));
      const rand2 = Math.round(Math.random() * (right.length - 1));
      if (left[rand1].score > right[rand2].score) {
        newSongs.push(cruce(songs[left[rand1].index], songs[right[rand2].index], rangesS1));
      } else {
        newSongs.push(cruce(songs[right[rand2].index], songs[left[rand1].index], rangesS1));
      }

      // }
    }
    songs = newSongs;
    console.log(left[0].score, right[0].score);
    // await Promise.all([elastic.deleteData("left"), elastic.deleteData("right")]);
  } while (left[0].score != 1 || right[0].score != 1);
  /*result.push(new Float32Array(left.length * 22 * 3));
  result.push(new Float32Array(right.length * 22 * 3));
  const sorted = sortSong([left,right]);
  let resultIndex = 0;
  sorted[0].forEach((item: any) => {
    let index = item.index * 22 * 3;
    const end = index + 22 * 3;
    while (index < end) {
      result[0][resultIndex++] = audioData.channelData[0][index++];
    }
  });
  resultIndex = 0;
  sorted[1].forEach((item: any) => {
    let index = item.index * 22 * 3;
    const end = index + 22 * 3;
    while (index < end) {
      result[1][resultIndex++] = audioData.channelData[1][index++];
    }
  });*/
  return result;
}

/*
CANCION PARA COMPOSE
 */

function cruce(pSong1: Song, pSong2: Song, ranges: any[]) {
  const son: Song = new Song();
  for (let channel = 0; channel < 2; channel++) {
    for (let index = 0; index < pSong1.getChannel(channel).length; index++) {
      const newLetter = cross(pSong1.getChannel(channel)[index].letter, pSong2.getChannel(channel)[index].letter);
      son.addToChannel(channel, {
        letter: newLetter,
        index: getIndex(ranges, newLetter, channel),
      },               getLetter(ranges, channel, newLetter));
    }
  }
  // son.sortSong();
  return son;
}

function cross(letter1: number, letter2: number) {
  const str: string = new Array(BITS + 1).join('0');
  let a = (str + letter1.toString(2));
  a = a.slice(a.length - BITS, a.length);
  let b = (str + letter2.toString(2));
  b = b.slice(b.length - BITS, b.length);
  let c = '';
  const size = Math.random() * (BITS - BITS * 0.3);
  const mutex = Math.round(Math.random());
  c = a.slice(0, size) + b.slice(size, b.length);
  if (mutex) {
    const pos = Math.random() * (BITS - 1);
    const rand = Math.round(Math.random());
    let d = '';
    for (let i = 0; i < c.length; i++) {
      if (i != pos) {
        d += c[i];
      } else {
        d += rand.toString(2);
      }
    }
    c = d;
  }
  return parseInt(c, 2);
}

function getElasticQueries(pLetters: string[][], pCants: any[][], pSongs: Song[], pGen: number): any[] {
  const Query: any[] = [];
  let id = 0;
  for (let song = 0; song < pSongs.length; song++) {
    const songScores = pSongs[song].getJson(pLetters, pCants);
    // console.log(songScores)
    Query.push({ index: { _index: 'left', _id: id++ } });
    const data = {
      index: song,
      score: songScores[0],
    };
    Query.push(data);
    Query.push({ index: { _index: 'right', _id: id++ } });
    const data2 = {
      index: song,
      score: songScores[1],
    };
    Query.push(data2);
  }
  return Query;
}

function getInitialSongs(ranges: any[], amountOfSongs: number, sizePerSong: number): Song[] {
  const songs: Song[] = [];
  for (let song = 0; song < amountOfSongs; song++) {
    songs.push(generateSong(ranges, sizePerSong));
  }
  return songs;
}

function generateSong(ranges: any[], size: number): Song {
  const song: Song = new Song();
  for (let channel = 0; channel < 2; channel++) {
    for (let index = 0; index < size; index++) {
      const rand = Math.round(Math.random() * Math.pow(2, BITS));
      song.addToChannel(channel, {
        letter: rand,
        index: getIndex(ranges, rand, channel),
      },                getLetter(ranges, channel, rand));
    }
  }
  //
  // song.sortSong();
  return song;
}

function getIndex(ranges: any[], rand: number, channel: number) {
  const letterI = getLetter(ranges, channel, rand);
  // ranges[channel][3][letterI][ranges[channel][2][letterI][1]-ranges[channel][2][letterI][0]/ranges[channel][3][letterI]]
  const list: any[] = ranges[channel][3][letterI];
  return list[rand % list.length];
}

function isInRange(lower: number, higher: number, letterNum: number) {
  return (lower <= letterNum && letterNum <= higher);

}

/*

COMPOSE

 */
function sortSong(SongCh: any[][]) {
  const newSectors2: any[][] = [[], []];
  for (let channel = 0; channel < 2; channel++) {
    let index = 0;
    while (index < sectorsS2[channel].length) {
      const matches = SongCh[channel].filter((item) => item.letter === sectorsS2[channel][index]);
      for (let i = 0; i < S2_MULTIPLIER; i++) {
        const ind = Math.round((matches.length - 1) * Math.random());
        newSectors2[channel].push(matches[ind]);
      }
      index++;
    }
  }
  return newSectors2;
}

function getLetter(ranges: any[], channel: number, rand: number): number {
  let found = false;
  let index = 0;
  while (!found) {
    if (isInRange(ranges[channel][2][index][0], ranges[channel][2][index][1], rand)) {
      found = true;
    } else {
      index++;
    }
  }

  // const newIndex = Math.round((ranges[channel][3][index].length - 1) * Math.random());
  return index;
}

function createFile(pChannel1: Float32Array, pChannel2: Float32Array, pName: string) {
  const newAudio = {
    sampleRate: BIT_RATE,
    numberOfChannels: 2,
    channelData: [
      pChannel1,
      pChannel2,
    ],
  };
  WavEncoder.encode(newAudio).then((buffer: any) => {
    fs.writeFileSync(pName, Buffer.from(buffer));
  });
}

function ranges(s: string): any[] {
  const LetterFound: string[] = ['L', 'F', 'V', 'P', 'M', 'B', 'S'];
  const CountFound: number[] = [0, 0, 0, 0, 0, 0, 0];
  const RangesFound: number[][] = [];
  const Letters: number[][] = [[], [], [], [], [], [], []];
  let lastFound = 0;
  for (let i = 0; i < s.length; i++) {
    const foundIndex = LetterFound.indexOf(s[i]);
    if (foundIndex == -1) {
      LetterFound.push(s[i]);
      CountFound.push(1);
      Letters.push([i]);
    } else {
      CountFound[foundIndex]++;
      Letters[foundIndex].push(i);

    }
  }
  for (let i = 0; i < CountFound.length; i++) {
    CountFound[i] = (CountFound[i]) * 100 / s.length;
    const newRange = Math.round(CountFound[i] / 100 * Math.pow(2, BITS));
    RangesFound.push([lastFound, lastFound + 1 + newRange]);
    lastFound += newRange;
  }
  const Result: any[][] = [];
  Result.push(LetterFound);
  Result.push(CountFound);
  Result.push(RangesFound);
  Result.push(Letters);
  return Result;
}
