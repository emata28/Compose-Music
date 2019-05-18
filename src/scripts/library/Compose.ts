import {AMOUNT_OF_SONGS, BITS, SEGMENT_SIZE} from "./consts";
import {SongSegment} from "./SongSegment";


  export function getSegments(pSong: string): SongSegment[] {
    const segments: SongSegment[] = [];
    for (let i = 0; i < pSong.length; i  +=Math.round(pSong.length/20)) {
      let segment: SongSegment = new SongSegment(pSong.substr(i, Math.round(pSong.length/20)-1), i, i+Math.round(pSong.length/20)-1);
      segment.analizeSegment();
      segments.push(segment);
    }
    return segments;

}
