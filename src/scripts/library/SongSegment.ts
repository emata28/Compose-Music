import {BITS} from "./consts";

export class SongSegment {
  private Segment: string;
  private letters: string [][] = [];
  private CountFound: number[] = [0, 0, 0];
  private LetterFound: string[] = ['S', 'B', 'P'];
  private Letters: number[][] = [[], [], []];
  private Start :number;
  private End:number;
  constructor(pSegment: string, pStart: number, pEnd: number) {
    this.Segment = pSegment;
    this.Start = pStart;
    this.End = pEnd;


  }

  private analizeSegment() {
    for (let i = 0; i < this.Segment.length; i++) {
      const foundIndex = this.LetterFound.indexOf(this.Segment[i]);
      this.CountFound[foundIndex]++;
      this.Letters[foundIndex].push(i);
      for (let i = 0; i < this.CountFound.length; i++) {
        this.CountFound[i] = (this.CountFound[i]) * 100 / this.Segment.length;
        const newRange = Math.round(this.CountFound[i] / 100 * Math.pow(2, BITS));

      }

    }
  }

  public getSegment(): string {
    return this.Segment;
  }

  public getletters(): string[][] {
    return this.letters;
  }

  public getCountFound(): number[] {
    return this.CountFound;
  }

  public getLetterFound(): string[] {
    return this.LetterFound;
  }

  public getLetters(): number[][] {
    return this.Letters;
  }
}

