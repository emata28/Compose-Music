import { Channel } from './library/Channel';
import { compose, createWav, getGoal, getSegments } from './library/Compose';
import {
  LATTER_RATE, S2_MULTIPLIER
} from './library/consts';
import { Individual } from './library/Individual';
import { InfoTable } from './library/InfoTable';
import { SongSegment } from './library/SongSegment';
import { analizeSong } from './library/Utilities';
import { readAudiodata } from './library/wavManagment';

const sectorsS1: Channel[] = [new Channel(), new Channel()];
const sectorsS2: Channel[] = [new Channel(), new Channel()];
const S1: string = process.argv[2];
const S2: string = process.argv[3];
const audioDataS1 = readAudiodata(S1);
const audioDataS2 = readAudiodata(S2);
const missingSegmentsS2: SongSegment[][] = [[], []];
const firstGen: SongSegment[][] = [[], []];

analizeSong(audioDataS1, sectorsS1);
analizeSong(audioDataS2, sectorsS2);

missingSegmentsS2[0] = getGoal(sectorsS2[0]);
missingSegmentsS2[1] = getGoal(sectorsS2[1]);

firstGen[0] = getSegments(sectorsS1[0]);
firstGen[1] = getSegments(sectorsS1[1]);

const infoTablesIndividual: InfoTable[][] = [[new InfoTable(), new InfoTable(), new InfoTable()],
  [new InfoTable(), new InfoTable(), new InfoTable()]];
const song = compose(missingSegmentsS2, firstGen, sectorsS1, infoTablesIndividual);
createWav(song, audioDataS1, sectorsS2[0].getInfo().length * LATTER_RATE * S2_MULTIPLIER);
