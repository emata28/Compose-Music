import { Individual } from './Individual';

export function fitness(pIndividual: Individual, pMissing: Individual[]) {
  const fitnessPerIndividual = [];
  for (let letter = 0; letter < pIndividual.getBitsValues().length; letter += 1) {
    fitnessPerIndividual.push(
      Math.abs(pIndividual.getBitsValues()[letter] - pMissing[0].getBitsValues()[letter]));
  }
  return fitnessPerIndividual;
}

export function getFit(pSongSegments: Individual[][], pMissing: Individual[][]): Individual[][] {
  const fit: Individual[][] = [[], []];
  for (let channel = 0; channel < 2; channel += 1) {
    for (const segment of pSongSegments[channel]) {
      const segFit = fitness(segment, pMissing[channel]);
      segment.setFitness(segFit);
      fit[channel].push(segment);
    }
  }
  fit[0] = fit[0].sort((a, b) => a.getAvgFitness() > b.getAvgFitness() ? 1 : -1)
    .slice(0, fit[0].length * 0.5);
  fit[1] = fit[1].sort((a, b) => a.getAvgFitness() > b.getAvgFitness() ? 1 : -1)
    .slice(0, fit[1].length * 0.5);
  return fit;
}
