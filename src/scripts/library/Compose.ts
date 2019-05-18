import { Channel } from './Channel';
import {AMOUNT_OF_SONGS, BITS, LetterOrder, SEGMENT_SIZE} from './consts';
import { fitness } from './Fitness';
import { bitsCross } from './Genetic';
import { Individual } from './Individual';
import { infoTable } from './infoTable';
import { SongSegment } from './SongSegment';

export function getSegments(pSong: Channel): SongSegment[] {
  const segments: SongSegment[] = [];

  for (let i = 0; i < pSong.getInfo().length; i += SEGMENT_SIZE) {
    let segmentData: any[] = [];
    for (const e = 0; i < SEGMENT_SIZE; i += 1) {
      const rand = Math.random() * pSong.getAll().length;
      segmentData.push(pSong.getAll()[rand]);
    }
    const segment: SongSegment = new SongSegment(segmentData);
    segmentData = [];
    segment.analizeSegment();
    // this.bitsValue[i] = Math.round(this.CountFound[i] / 100 * Math.pow(2, BITS));
    segments.push(segment);
  }
  return segments;
}

export function getFit(pSongSegments: Individual[][], pMissing: Individual[][]) {
  const fit: Individual[][] = [[], []];
  for (let channel = 0; channel < 2; channel += 1) {
    for (const segment of pSongSegments[channel]) {
      const segFit = fitness(segment, pMissing[channel]);
      segment.setFitness(segFit);
      fit[channel].push(segment);
    }
  }
  fit[0] = fit[0].sort((a, b) => a.getFitness() > b.getFitness() ? 1 : -1)
    .slice(0, fit[0].length * 0.5);
  fit[1] = fit[1].sort((a, b) => a.getFitness() > b.getFitness() ? 1 : -1)
    .slice(0, fit[1].length * 0.5);
  return fit;
}

export function cross(pFitSongs: Individual[][]): Individual[][] {
  const sons: Individual[][] = [[], []];
  for (let channel = 0; channel < 2; channel += 1) {
    for (let indi = 0; indi < pFitSongs.length * 2; indi += 1) {
      const pos1 = Math.random() * (pFitSongs[channel].length - 1);
      const pos2 = Math.random() * (pFitSongs[channel].length - 1);
      const bitsValue = pFitSongs[channel][pos1].getBitsValues();
      const bits2 = pFitSongs[channel][pos2].getBitsValues();
      const newBits: number[] = [];
      for (let bit = 0; bit < bitsValue.length; bit += 1) {
        newBits.push(bitsCross(bitsValue[bit], bits2[bit]));
      }
      sons[channel].push(new Individual(newBits));
    }
  }
  return sons;
}
function individualsToSegments(pSons: Individual[], pChannel: Channel) {
  const segments: SongSegment[] = [];
  for (const son of pSons) {
    const bits = son.getBitsValues();
    const aasdasda = [];
    for (let bit = 0; bit < bits.length; bit += 1) {
      let amount = bits[bit]/Math.pow(2,BITS) * SEGMENT_SIZE;
      while (amount > 0) {
        const letters = pChannel.getLetter(LetterOrder[bit]);
        const newLetter = letters[(letters.length - 1) * Math.random()];
        aasdasda.push(newLetter);
        amount -= 1;
      }
    }
    const segment = new SongSegment(aasdasda);
    segments.push(segment);
  }
  return segments;
}
function checkifFound(pMissing: Individual[], pGeneration: Individual[]) {
  for (let i = 0; i < pMissing.length; i += 1) {
    const index = pGeneration.indexOf(pMissing[i]);
    if (index !== -1) {
      pMissing.splice(i, 1);

    }
  }
}

function generateMissing(pSegments: SongSegment[]) {
  const missing: Individual[] = [];
  for (const segment of pSegments) {
    const bits: number[] = [];
    const percentages = segment.getPorcentages();
    for (let percentage = 0; percentage < percentages.length; percentage += 1) {
      bits[percentage] = percentages[percentage] * Math.pow(2, BITS);
    }
    missing.push(new Individual(bits));
  }
  return missing;
}
