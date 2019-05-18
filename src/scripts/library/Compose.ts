import {AMOUNT_OF_SONGS, BITS, SEGMENT_SIZE} from "./consts";
import {SongSegment} from "./SongSegment";
export class Compose {


  public getSegments(pSong: string): SongSegment[] {
    const segments: SongSegment[] = [];
    for (let i = 0; i < pSong.length; i = +SEGMENT_SIZE) {
      let segment: SongSegment = new SongSegment(pSong.substr(i, i + SEGMENT_SIZE), i, SEGMENT_SIZE - 1);
      segment.analizeSegment();
      segments.push(segment);
    }
    return segments;
  }
}
