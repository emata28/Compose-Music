import {BITS, LetterOrder} from './consts';

export class SongSegment {
  private Segment: any[];
  private CountFound: number[] = [0, 0, 0];
  private Porcentages: number[] = [0, 0, 0];
  private Fitness: number[] = [0, 0, 0];

  constructor(pSegment: any[]) {
    this.Segment = pSegment;
  }

  public analizeSegment() {
    for (let i = 0; i < this.Segment.length; i += 1) {
      const foundIndex = LetterOrder.indexOf(this.Segment[i].letter);
      this.CountFound[foundIndex] += 1;

    }
    for (let i = 0; i < this.CountFound.length; i += 1) {
      this.Porcentages[i] = (this.CountFound[i]) * 100 / this.Segment.length;
    }
  }

  public getPorcentages(): number[] {
    return this.Porcentages;
  }

  public getCountFound(): number[] {
    return this.CountFound;
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
