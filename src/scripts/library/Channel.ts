import {DumbMap} from './dumbMap';

export class Channel {
  private info: string;
  private letters: DumbMap;
  private index: number;
  private all: any[];

  constructor() {
    this.info = '';
    this.letters = new DumbMap();
    this.index = 0;
    this.all = [];
  }

  public addLetter(pLetter: string) {
    this.info += pLetter;
    const prev = this.letters.get(pLetter);
    const newLetter = {letter: pLetter, index: this.index};
    if (prev !== undefined) {
      prev.push(newLetter);
      this.letters.set(pLetter, prev);
    } else {
      this.letters.set(pLetter, [newLetter]);
    }
    this.index += 1;
    this.all.push(newLetter);
  }

  public getLetter(pLetter: string): any[] {
    return this.letters.get(pLetter);
  }

  public getAll(): any[] {
    return this.all;
  }

  public getInfo(): string {
    return this.info;
  }
}
