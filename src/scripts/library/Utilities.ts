import {LATTER_RATE} from "./consts";
import {getForm, getSector} from "./sector";
import {BITS} from "./consts";

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
