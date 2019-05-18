import { AMOUNT_OF_SONGS, BIT_RATE, BITS,
  LATTER_RATE,  S2_MULTIPLIER } from './library/consts';
import { getForm, getSector } from './library/sector';
import { readAudiodata } from './library/wavManagment';
import {analizeSong} from "./library/Utilities";
import {Compose} from "./library/Compose";
const sectorsS1: string[] = ['', ''];
const sectorsS2: string[] = ['', ''];
const S1: string = process.argv[2];
const S2: string = process.argv[3];
const audioDataS1 = readAudiodata(S1);
const audioDataS2 = readAudiodata(S2);


analizeSong(audioDataS1, sectorsS1);
analizeSong(audioDataS2, sectorsS2);
console.log(sectorsS1)