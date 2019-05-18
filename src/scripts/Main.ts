import { AMOUNT_OF_SONGS, BIT_RATE, BITS,
  LATTER_RATE,  S2_MULTIPLIER } from './library/consts';
import { getForm, getSector } from './library/sector';
import { readAudiodata } from './library/wavManagment';
import {analizeSegments, analizeSong} from "./library/Utilities";
import {getSegments} from "./library/Compose";
import {SongSegment} from "./library/SongSegment";
import {infoTable} from "./library/infoTable";
const sectorsS1: string[] = ['', ''];
const sectorsS2: string[] = ['', ''];
const S1: string = process.argv[2];
const S2: string = process.argv[3];
const audioDataS1 = readAudiodata(S1);
const audioDataS2 = readAudiodata(S2);
const missingSegmentsS2:SongSegment[][] = [[],[]];
const Result:SongSegment[][] = [[],[]];
const infoTableS2:infoTable[][] = [[],[]];


analizeSong(audioDataS1, sectorsS1);
analizeSong(audioDataS2, sectorsS2);
console.log(sectorsS1)
missingSegmentsS2[0] = getSegments(sectorsS2[0]);
missingSegmentsS2[1] = getSegments(sectorsS2[1]);
infoTableS2[0]=analizeSegments(missingSegmentsS2[0]);
infoTableS2[1]=analizeSegments(missingSegmentsS2[1]);
console.log(infoTableS2)