import {LATTER_RATE, LetterOrder} from './consts';
import { BITS } from './consts';
import { infoTable } from './infoTable';
import { getSector } from './sector';
import { SongSegment } from './SongSegment';

export function analizeSong(pAudioData: any, pSectors: string[]) {
  for (let i = 0; i < pAudioData.channelData[0].length; i += LATTER_RATE) {
    const channel1 = getSector(pAudioData.channelData[0][i], pAudioData.channelData[0][i + LATTER_RATE]);
    const channel2 = getSector(pAudioData.channelData[1][i], pAudioData.channelData[1][i + LATTER_RATE]);
    pSectors[0] += channel1;
    pSectors[1] += channel2;

  }

}export function analizeSegments(pSegments: SongSegment[]): infoTable[] {
  const  tableS = new infoTable();
  const  tableB = new infoTable();
  const  tableP = new infoTable();
  const result: infoTable[] = [tableS, tableB, tableP];
  for (let segmentIndex = 0; segmentIndex < pSegments.length; segmentIndex ++) {
    for (let letterIndex = 0; letterIndex < LetterOrder.length; letterIndex++) {
      result[letterIndex].placeSegment(pSegments[segmentIndex], Math.round(pSegments[segmentIndex].getPorcentages()[letterIndex]));
    }
  }
  for (let letterIndex = 0; letterIndex < LetterOrder.length; letterIndex++) {
    result[letterIndex].calcData();
  }


  return result;
}
