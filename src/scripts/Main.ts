import { AMOUNT_OF_SONGS, BIT_RATE, BITS,
  LATTER_RATE,  S2_MULTIPLIER } from './library/consts';
import { getForm, getSector } from './library/sector';
import { readAudiodata } from './library/wavManagment';
import {Compose} from "./library/Compose";
const sectorsS1: string[] = ['', ''];
const sectorsS2: string[] = ['', ''];
const S1: string = process.argv[3];
const S2: string = process.argv[4];
const command: string = process.argv[2];
const audioDataS1 = readAudiodata(S1);
const audioDataS2 = readAudiodata(S2);



