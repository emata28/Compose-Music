import {BITS, LetterOrder} from './consts';

export class SongSegment {
  private Segment: string;

  private CountFound: number[] = [0, 0, 0];
  private Porcentages: number[] = [0, 0, 0];
  private Fitness: number[] = [0, 0, 0];
  private Letters: number[][] = [[], [], []];
  private Start: number;
  private End: number;
  constructor(pSegment: string, pStart: number, pEnd: number) {
    this.Segment = pSegment;
    this.Start = pStart;
    this.End = pEnd;

  }

  public analizeSegment() {
    for (let i = 0; i < this.Segment.length; i += 1) {
      const foundIndex = LetterOrder.indexOf(this.Segment[i]);
      this.CountFound[foundIndex] += 1;
      this.Letters[foundIndex].push(i);

    }
    for (let i = 0; i < this.CountFound.length; i += 1) {
      this.Porcentages[i] = (this.CountFound[i]) * 100 / this.Segment.length;
    }
  }

  public getSegment(): string {
    return this.Segment;
  }

  public getPorcentages(): number[] {
    return this.Porcentages;
  }

  public getCountFound(): number[] {
    return this.CountFound;
  }

  public getLetters(): number[][] {
    return this.Letters;
  }

  public getFitness(): number[] {
    return this.Fitness;
  }

  public getAvgFitness() {
    let avg = 0;
    this.Fitness.forEach(fit => avg += fit);
    avg /= this.Fitness.length;
    return avg;
  }

  public setFitness(pFitness: number[]) {
    this.Fitness = pFitness;
  }
}
