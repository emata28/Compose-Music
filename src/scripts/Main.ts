import { AMOUNT_OF_SONGS, BIT_RATE, BITS,
  LATTER_RATE,  S2_MULTIPLIER } from './library/consts';
import { getForm, getSector } from './library/sector';
import { readAudiodata } from './library/wavManagment';
import {analizeSegments, analizeSong} from "./library/Utilities";
import {getFit, getSegments} from "./library/Compose";
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
const  individuals:SongSegment[][] = [[],[]];



analizeSong(audioDataS1, sectorsS1);
analizeSong(audioDataS2, sectorsS2);



console.log(sectorsS1)


missingSegmentsS2[0] = getSegments(sectorsS2[0]);
missingSegmentsS2[1] = getSegments(sectorsS2[1]);

individuals[0] = getSegments(sectorsS1[0]);
individuals[1] = getSegments(sectorsS1[1]);
let infoTablesIndividual: infoTable[][]=[];
let  fitIindividuals:SongSegment[][] = [[],[]];

infoTablesIndividual.push(analizeSegments(individuals[0]));
infoTablesIndividual.push(analizeSegments(individuals[1]));
fitIindividuals=getFit(individuals,missingSegmentsS2);
console.log()
