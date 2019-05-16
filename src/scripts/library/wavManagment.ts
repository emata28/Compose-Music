import * as fs from 'fs';
import * as WavDecoder from 'wav-decoder';
import * as WavEncoder from 'wav-encoder';
import { BIT_RATE } from './consts';

export function readAudiodata(filename: string) {
  return WavDecoder.decode.sync(fs.readFileSync(filename));
}

export function createFile(pChannel1: Float32Array, pChannel2: Float32Array, pName: string) {
  const newAudio = {
      channelData: [
        pChannel1,
        pChannel2,
      ],
    sampleRate: BIT_RATE,
    numberOfChannels: 2
,
  };
  WavEncoder.encode(newAudio).then((buffer: any) => {
    fs.writeFileSync(pName,buffer);
  });
}