import { Channel } from './Channel';
import { LATTER_RATE, LETTER_ORDER } from './consts';
import { InfoTable } from './InfoTable';
import { getSector } from './sector';
import { SongSegment } from './SongSegment';

export function analizeSong(pAudioData: any, pSectors: Channel[]) {
  for (let i = 0; i < pAudioData.channelData[0].length; i += LATTER_RATE) {
    const channel1 = getSector(pAudioData.channelData[0][i],
                               pAudioData.channelData[0][i + LATTER_RATE]);
    const channel2 = getSector(pAudioData.channelData[1][i],
                               pAudioData.channelData[1][i + LATTER_RATE]);
    pSectors[0].addLetter(channel1);
    pSectors[1].addLetter(channel2);

  }

}
export function placeMultipleSegments(pTable: InfoTable[], pSegment: SongSegment) {
  for (let letter = 0; letter < pTable.length; letter += 1) {
    pTable[letter].placeSegment(pSegment, pSegment.getPercentages()[letter]);
    pTable[letter].calcData();
  }
}
export function analizeSegments(pSegments: SongSegment[][], pTable: InfoTable[][]): InfoTable[][] {

  for (let channel = 0; channel < pTable.length; channel += 1) {
    for (const segment of pSegments[channel]) {
      for (let letterIndex = 0; letterIndex < LETTER_ORDER.length; letterIndex += 1) {
        pTable[channel][letterIndex]
          .placeSegment(segment,
                        Math.round(segment.getPercentages()[letterIndex]));
      }
    }
    for (let letterIndex = 0; letterIndex < LETTER_ORDER.length; letterIndex += 1) {
      pTable[channel][letterIndex].calcData();
    }
  }

  return pTable;
}
