export class Individual {
  private readonly bitsValues: number[];
  private fitness: number[];
  constructor(pValues: number[]) {
    this.bitsValues = pValues;
    this.fitness = [];
  }

  public getBitsValues(): number[] {
    return this.bitsValues;
  }

  public getFitness() {
    return this.fitness;
  }

  public setFitness(pFitness: number[]) {
    this.fitness = pFitness;
  }
}
