/*import {AMOUNT_OF_SONGS, BITS, S2_MULTIPLIER} from "./consts";
import {Song} from "./song";




async function compose(audioData: any,sectorsS1: string[],sectorsS2: string[]) {
  const rangesS1 = [ranges(sectorsS1[0]), ranges(sectorsS1[1])];
  const rangesS2 = [ranges(sectorsS2[0]), ranges(sectorsS2[1])];
  const newLength = sectorsS2[0].length * S2_MULTIPLIER;
  let left: any[] = [];
  let right: any[] = [];
  const result: Float32Array[] = [];
  const gen = 0;
  let songs = getInitialSongs(rangesS1, AMOUNT_OF_SONGS, newLength);
  do {
    left = [];
    right = [];

    const newSongs: Song[] = [];

    for (let song = 0; newSongs.length < AMOUNT_OF_SONGS; song++) {
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
  } while (left[0].score != 1 || right[0].score != 1);

  return result;
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
}*/