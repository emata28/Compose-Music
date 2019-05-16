import {BITS} from "./consts";
import {Song} from "./song";

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


