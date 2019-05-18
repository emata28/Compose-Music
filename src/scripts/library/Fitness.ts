import { SongSegment } from './SongSegment';

export function fitness(pIndividual: SongSegment, pMissing: SongSegment[]) {
  const fitness = [];
  for (let letter = 0; letter < pIndividual.getFitness().length; letter += 1) {
    let avg = 0;
    pMissing.forEach(element => avg += element.getPorcentages()[letter]);
    avg /= pMissing.length;
    fitness.push(Math.abs(pIndividual.getPorcentages()[letter] - avg));
  }
  return fitness;
}
