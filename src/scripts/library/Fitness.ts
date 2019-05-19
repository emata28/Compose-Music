import { Individual } from './Individual';

export function fitness(pIndividual: Individual, pMissing: Individual[]) {
  const fitness = [];
  for (let letter = 0; letter < pIndividual.getBitsValues().length; letter += 1) {
    let avg = 0;
    pMissing.forEach(element => avg += element.getBitsValues()[letter]);
    avg /= pMissing.length;
    fitness.push(Math.abs(pIndividual.getBitsValues()[letter] - avg));
  }
  return fitness;
}
