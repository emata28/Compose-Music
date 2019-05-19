import {Channel} from './library/Channel';
import { AMOUNT_OF_SONGS, BIT_RATE, BITS,
  LATTER_RATE,  S2_MULTIPLIER } from './library/consts';
import {Individual} from './library/Individual';
import { getForm, getSector } from './library/sector';
import { readAudiodata } from './library/wavManagment';
import {analizeSegments, analizeSong} from "./library/Utilities";
import {generateIndividuals,  getFit, getSegments} from "./library/Compose";
import {SongSegment} from "./library/SongSegment";
import {infoTable} from "./library/infoTable";
const sectorsS1: Channel[] = [new Channel(),new Channel()];
const sectorsS2: Channel[] = [new Channel(),new Channel()];
const S1: string = process.argv[2];
const S2: string = process.argv[3];
const audioDataS1 = readAudiodata(S1);
const audioDataS2 = readAudiodata(S2);
const missingSegmentsS2:SongSegment[][] = [[],[]];
const  individuals:Individual[][] = [[],[]];
const  Segments:SongSegment[][] = [[],[]];
const objetive:Individual[][] =[[],[]];



analizeSong(audioDataS1, sectorsS1);
analizeSong(audioDataS2, sectorsS2);


missingSegmentsS2[0] = getSegments(sectorsS2[0]);

missingSegmentsS2[1] = getSegments(sectorsS2[1]);
objetive[0] = generateIndividuals(missingSegmentsS2[0]);
objetive[1] = generateIndividuals(missingSegmentsS2[1]);


individuals[0] = generateIndividuals(missingSegmentsS2[0]);
individuals[1] = generateIndividuals(missingSegmentsS2[1]);


Segments[0] = getSegments(sectorsS1[0]);

Segments[1] = getSegments(sectorsS1[1]);
let infoTablesIndividual: infoTable[][]=[];
let  fitIindividuals:Individual[][] = [[],[]];

infoTablesIndividual.push(analizeSegments(Segments[0]));
infoTablesIndividual.push(analizeSegments(Segments[1]));
fitIindividuals=getFit(individuals,objetive);
console.log()
