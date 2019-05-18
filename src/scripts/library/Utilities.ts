import {LATTER_RATE} from "./consts";
import {getForm, getSector} from "./sector";
import {Song} from "../../../build/src/scripts/library/song";
import {BITS} from "./consts";

export function getIndex(ranges: any[], rand: number, channel: number) {
  const letterI = getLetter(ranges, channel, rand);
  // ranges[channel][3][letterI][ranges[channel][2][letterI][1]-ranges[channel][2][letterI][0]/ranges[channel][3][letterI]]
  const list: any[] = ranges[channel][3][letterI];
  return list[rand % list.length];
}

export function isInRange(lower: number, higher: number, letterNum: number) {
  return (lower <= letterNum && letterNum <= higher);

}
export function getLetter(ranges: any[], channel: number, rand: number): number {
  let found = false;
  let index = 0;
  while (!found) {
    if (isInRange(ranges[channel][2][index][0], ranges[channel][2][index][1], rand)) {
      found = true;
    } else {
      index++;
    }
  }
  // const newIndex = Math.round((ranges[channel][3][index].length - 1) * Math.random());
  return index;
}
export function analizeSong(pAudioData:any, pSectors: string[]) {
  for (let i = 0; i < pAudioData.channelData[0].length; i += LATTER_RATE) {
    const channel1 = getSector(pAudioData.channelData[0][i], pAudioData.channelData[0][i + LATTER_RATE]);
    const channel2 = getSector(pAudioData.channelData[1][i], pAudioData.channelData[1][i + LATTER_RATE]);
    pSectors[0] += channel1;
    pSectors[1] += channel2;

  }
  //pSectors[0] = getForm(pSectors[0]);
  //pSectors[1] = getForm(pSectors[1]);
}

