import { AMOUNT_OF_SONGS, AMOUNT_SEGMETNS, BITS, SEGMENT_SIZE } from './consts';
import { fitness } from './Fitness';
import { bitsCross } from './Genetic';
import { Individual } from './Individual';
import { SongSegment } from './SongSegment';

export function getSegments(pSong: string): SongSegment[] {
  const segments: SongSegment[] = [];
  for (let i = 0; i < pSong.length; i += Math.round(pSong.length / AMOUNT_SEGMETNS)) {
    const segment: SongSegment = new SongSegment(
      pSong.substr(i, Math.round(pSong.length / AMOUNT_SEGMETNS) - 1), i,
      i + Math.round(pSong.length / AMOUNT_SEGMETNS) - 1
    );
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
    for (let indi = 0; indi < AMOUNT_SEGMETNS; indi += 1) {
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
