import { AMOUNT_OF_SONGS, BIT_RATE, BITS,
  LATTER_RATE, PATTERN_SIZE, S2_MULTIPLIER } from './library/consts';
import { Pattern } from './library/Patterns';
import { getForm, getSector } from './library/sector';
import { Song } from './library/song';
import { readAudiodata } from './library/wavManagment';
import {analizeSong} from "./library/Utilities";
const sectorsS1: string[] = ['', ''];
const sectorsS2: string[] = ['', ''];
const S1: string = process.argv[3];
const S2: string = process.argv[4];
const command: string = process.argv[2];
const audioDataS1 = readAudiodata(S1);
const audioDataS2 = readAudiodata(S2);

analizeSong(audioDataS1, sectorsS1);
analizeSong(audioDataS2, sectorsS2);

console.log(sectorsS1);