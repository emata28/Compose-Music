import { Channel } from './Channel';
import { AMOUNT_OF_SONGS, BITS, LetterOrder, SEGMENT_SIZE } from './consts';
import { fitness } from './Fitness';
import { bitsCross } from './Genetic';
import { Individual } from './Individual';
import { infoTable } from './infoTable';
import { SongSegment } from './SongSegment';

export function getSegments(pSong: Channel): SongSegment[] {
  const segments: SongSegment[] = [];

  for (let i = 0; i < pSong.getInfo().length; i += SEGMENT_SIZE) {
    const segmentData: any[] = [];
    for (let e = 0; e < SEGMENT_SIZE; e += 1) {
      const rand = Math.round(Math.random() * (pSong.getAll().length - 1));
      segmentData.push(pSong.getAll()[rand]);
    }
    const segment: SongSegment = new SongSegment(segmentData);
    segment.analizeSegment();
    // this.bitsValue[i] = Math.round(this.CountFound[i] / 100 * Math.pow(2, BITS));
    segments.push(segment);
  }
  return segments;
}
export function getGoal(pSong: Channel): SongSegment[] {
  const segments: SongSegment[] = [];
  for (let i = 0; i < pSong.getInfo().length; i += SEGMENT_SIZE) {
    const segmentData: any[] = [];
    for (let e = 0; e < SEGMENT_SIZE && (i + e) < pSong.getInfo().length; e += 1) {
      segmentData.push(pSong.getAll()[i + e]);
    }
    const segment: SongSegment = new SongSegment(segmentData);
    segment.analizeSegment();
    segments.push(segment);
  }
  return segments;
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

export function cross(pFitSongs: Individual[][]): Individual[][] {
  const sons: Individual[][] = [[], []];
  for (let channel = 0; channel < 2; channel += 1) {
    for (let indi = 0; indi < pFitSongs[channel].length * 2; indi += 1) {
      const pos1 = Math.round(Math.random() * (pFitSongs[channel].length - 1));
      const pos2 = Math.round(Math.random() * (pFitSongs[channel].length - 1));
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
function individualsToSegments(pSons: Individual[][], pChannel: Channel[]) {
  const segments: SongSegment[][] = [[], []];
  for (let channel = 0; channel < segments.length; channel += 1) {
    for (const son of pSons[channel]) {
      const bits = son.getBitsValues();
      const aasdasda = [];
      for (let bit = 0; bit < bits.length; bit += 1) {
        let amount = bits[bit] / Math.pow(2, BITS) * SEGMENT_SIZE;
        while (amount > 0) {
          const letters = pChannel[channel].getLetter(LetterOrder[bit]);
          const newLetter = letters[Math.round((letters.length - 1) * Math.random())];
          aasdasda.push(newLetter);
          amount -= 1;
        }
      }
      const segment = new SongSegment(aasdasda);
      segment.analizeSegment();
      segments[channel].push(segment);
    }
  }
  return segments;
}
function checkifFound(pMissing: Individual[][], pGeneration: Individual[][]) {
  for (let channel = 0; channel < pMissing.length; channel += 1) {
    for (let i = 0; i < pMissing[channel].length; i += 1) {
      const index = pGeneration[channel].indexOf(pMissing[channel][i]);
      if (index !== -1) {
        pMissing.splice(i, 1);
      }
    }
  }
}

export function generateIndividuals(pSegments: SongSegment[]): Individual[] {
  const missing: Individual[] = [];
  for (const segment of pSegments) {
    const bits: number[] = [];
    const percentages = segment.getPorcentages();
    for (let percentage = 0; percentage < percentages.length; percentage += 1) {
      bits[percentage] = percentages[percentage] / 100 * Math.pow(2, BITS);
    }
    missing.push(new Individual(bits));
  }
  return missing;
}

export function compose(pMissing: SongSegment[][], pGen: SongSegment[][], pChannel: Channel[]) {
  let gen = pGen;
  console.log("CACA");
  const missingIndividuals: Individual[][] = [
    generateIndividuals(pMissing[0]),
    generateIndividuals(pMissing[1])
  ];
  do {
    const genIndividuals: Individual[][] = [
      generateIndividuals(gen[0]),
      generateIndividuals(gen[1])
    ];
    const fitIndividuals = getFit(genIndividuals, missingIndividuals);
    console.log(
      fitIndividuals[0][0]
    )
    const SanCarlos = cross(fitIndividuals);
    gen = individualsToSegments(SanCarlos, pChannel);
    checkifFound(missingIndividuals, SanCarlos);
  } while (pMissing[0].length !== 0 || pMissing[1].length !== 0);
}
