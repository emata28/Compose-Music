import {BITS} from './consts';

function bitsCross(pSubjectA: number, pSubjectB: number): number {
  let newNumber: number = 0;
  const crossOver = Math.round(Math.random() * (BITS - 1));
  for (let count = 0; count < BITS; count += 1) {
    const newBit = 0x1 & ((count < crossOver ? pSubjectA : pSubjectB) >> count);
    newNumber += (newBit << count);
  }
  return newNumber;
}

export function cross() {
  // Do bitsCross TODO
}
