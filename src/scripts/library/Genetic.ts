import {BITS} from './consts';

export function bitsCross(pSubjectA: number, pSubjectB: number): number {
  let newNumber: number = 0;
  const crossOver = Math.round(Math.random() * (BITS - 1));
  const mutIndex = Math.round(Math.random() * (BITS - 1));
  const mutate = Math.random() * 100;
  for (let count = 0; count < BITS; count += 1) {
    let newBit: any = 0x1 & ((count < crossOver ? pSubjectA : pSubjectB) >> count);
    if (mutate <= 6.35 && count === mutIndex) {
      newBit = !newBit;
    }
    newNumber += (newBit << count);
  }
  return newNumber;
}