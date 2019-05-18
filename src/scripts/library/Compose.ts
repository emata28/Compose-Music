import { AMOUNT_OF_SONGS, BITS, SEGMENT_SIZE } from './consts';
import { fitness } from './Fitness';
import { SongSegment } from './SongSegment';

export function getSegments(pSong: string): SongSegment[] {
  const segments: SongSegment[] = [];
  for (let i = 0; i < pSong.length; i += Math.round(pSong.length / 20)) {
    const segment: SongSegment = new SongSegment(
      pSong.substr(i, Math.round(pSong.length / 20) - 1), i,
      i + Math.round(pSong.length / 20) - 1
    );
    segment.analizeSegment();
    segments.push(segment);
  }
  return segments;
}

export function getFit(pSongSegments: SongSegment[][], pMissing: SongSegment[][]) {
  const fit: SongSegment[][] = [[], []];
  for (let channel = 0; channel < 2; channel += 1) {
    for (const segment of pSongSegments[channel]) {
      const segFit = fitness(segment, pMissing[channel]);
      segment.setFitness(segFit);
    }
    pSongSegments[channel].sort((a: SongSegment, b: SongSegment) => {
      return a.getAvgFitness() < b.getAvgFitness() ? 1 : -1;
    });
  }
  fit[0] = pSongSegments[0].slice(0, pSongSegments[0].length * 0.5);
  fit[1] = pSongSegments[1].slice(0, pSongSegments[1].length * 0.5);
  return fit;
}

export function cross() {
  // TODO
}
