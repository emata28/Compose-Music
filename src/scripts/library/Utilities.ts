import {Channel} from './Channel';
import {LATTER_RATE, LetterOrder} from './consts';
import {BITS} from './consts';
import {infoTable} from './infoTable';
import {getSector} from './sector';
import {SongSegment} from './SongSegment';

export function analizeSong(pAudioData: any, pSectors: Channel[]) {
  for (let i = 0; i < pAudioData.channelData[0].length; i += LATTER_RATE) {
    const channel1 = getSector(pAudioData.channelData[0][i], pAudioData.channelData[0][i + LATTER_RATE]);
    const channel2 = getSector(pAudioData.channelData[1][i], pAudioData.channelData[1][i + LATTER_RATE]);
    pSectors[0].addLetter(channel1);
    pSectors[1].addLetter(channel2);

  }

}
export function placeMultipleSegments(pTable:infoTable[],pSegment: SongSegment) {
  for(let letter = 0; letter<pTable.length;letter++){
  pTable[letter].placeSegment(pSegment,pSegment.getPorcentages()[letter]);
  pTable[letter].calcData();
  }
}
export function analizeSegments(pSegments: SongSegment[][], pTable: infoTable[][]): infoTable[][] {

  for (let channel = 0; channel < pTable.length; channel += 1) {
    for (let segmentIndex = 0; segmentIndex < pSegments[channel].length; segmentIndex++) {
      for (let letterIndex = 0; letterIndex < LetterOrder.length; letterIndex++) {
        pTable[channel][letterIndex].placeSegment(pSegments[channel][segmentIndex], Math.round(pSegments[channel][segmentIndex].getPorcentages()[letterIndex]));
      }
    }
    for (let letterIndex = 0; letterIndex < LetterOrder.length; letterIndex++) {
      pTable[channel][letterIndex].calcData();
    }
  }

  return pTable;
}
