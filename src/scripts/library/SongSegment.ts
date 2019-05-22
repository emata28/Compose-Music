import { LETTER_ORDER } from './consts';

export class SongSegment {
  private segment: any[];
  private countFound: number[] = [0, 0, 0];
  private percentages: number[] = [0, 0, 0];
  private fitness: number[] = [0, 0, 0];

  constructor(pSegment: any[]) {
    this.segment = pSegment;
  }

  public analizeSegment() {
    for (const segment of this.segment) {
      const foundIndex = LETTER_ORDER.indexOf(segment.letter);
      this.countFound[foundIndex] += 1;

    }
    for (let i = 0; i < this.countFound.length; i += 1) {
      this.percentages[i] = (this.countFound[i]) * 100 / this.segment.length;
    }
  }

  public getPercentages(): number[] {
    return this.percentages;
  }

  public getCountFound(): number[] {
    return this.countFound;
  }

  public getFitness(): number[] {
    return this.fitness;
  }

  public getAvgFitness() {
    let avg = 0;
    this.fitness.forEach(fit => avg += fit);
    avg /= this.fitness.length;
    return avg;
  }

  public setFitness(pFitness: number[]) {
    this.fitness = pFitness;
  }

  public getLetters() {
    return this.segment;
  }
}
