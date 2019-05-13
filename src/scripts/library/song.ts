import { DumbMap } from "./dumbMap";
import { S2_MULTIPLIER } from "./consts";

export class Song {
  private Left: any[];
  private Right: any[];
  private letters: DumbMap[];

  constructor() {
    this.Left = [];
    this.Right = [];
    this.letters = [new DumbMap(),new DumbMap()];
  }

  public getChannel(pChannel: number) {
    if (pChannel) {
      return this.Right;
    } else {
      return this.Left;
    }
  }

  public addToChannel(pChannel: number, pPoint: any, letter: number) {
    if(pChannel) {
      this.Right.push(pPoint);
    } else {
      this.Left.push(pPoint);
    }
    const prev = this.letters[pChannel].get(letter);
    if (prev != undefined) {
      this.letters[pChannel].set(letter, prev + 1);
    } else {
      this.letters[pChannel].set(letter, 1);
    }
  }

  public getLetterAmount(pLetter: string, pChannel: number) {
    return this.letters[pChannel].get(pLetter);
  }

  public getJson(pLetters: string[][], pCants: any[][]): number[] {
    let json: number[] = [0,0];
    for (let channel = 0; channel < 2; channel++) {
      let score: number = 0;
    for (let i = 0; i < pLetters[channel].length; i++) {
      if (pCants[channel][i].length != 0) {
        const p = this.letters[channel].get(i) / (pCants[channel][i].length * S2_MULTIPLIER);
        if (p > 1) {
          score += 2 - p;
        } else {
          score += p;
        }
      }
    }
    json[channel] = score / pLetters[channel].length;
  }
  return json;
  }
  public sortSong() {
    this.Left = this.Left.sort((a: any,b: any) => {
      return a.letter < b.letter ? 1: -1;
    });
    this.Right = this.Right.sort((a: any,b: any) => {
      return a.letter < b.letter ? 1: -1;
    });
  }
}
