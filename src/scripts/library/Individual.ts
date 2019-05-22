export class Individual {
  private bitsValues: number[];
  private fitness: number[];

  constructor(pValues: number[]) {
    this.bitsValues = pValues;
    this.fitness = [];
  }

  public getBitsValues(): number[] {
    return this.bitsValues;
  }

  public setBitsValues(pBitsValues: number[]) {
    this.bitsValues = pBitsValues;
  }

  public getFitness() {
    return this.fitness;
  }

  public getAvgFitness(): number {
    let avg = 0;
    this.fitness.forEach(fit => avg += fit);
    avg /= this.fitness.length;
    return avg;
  }

  public setFitness(pFitness: number[]) {
    this.fitness = pFitness;
  }
}
