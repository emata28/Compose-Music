import { BITS } from './consts';
import { SongSegment } from './SongSegment';

export class InfoTable {
  private segments: SongSegment[][] = [[], [], [], [], [], [], [], [], [], []];
  private percentages: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  private ranges: number[][] = [[], [], [], [], [], [], [], [], [], []];

  private total: number;

  constructor() {
    this.total = 0;
  }

  public calcData() {
    this.calcPercentages();
    this.calcRanges();

  }

  public placeSegment(pSegment: SongSegment, pPorcentage: number) {
    let percentage = pPorcentage;
    if (pPorcentage === 100) {
      percentage -= 1;
    }
    this.segments[Math.floor(percentage / 10)].push(pSegment);
    this.total += 1;
  }

  public getFromPercentage(pPercentage: number[]) {
    const slot = Math.floor(pPercentage[0] / 10);
    for (const segment of this.segments[slot]) {
      if (Math.floor(segment.getPercentages()[1]) === Math.floor(pPercentage[1])
        && Math.floor(segment.getPercentages()[2]) === Math.floor(pPercentage[2])) {
        return segment;
      }
    }
    return this.segments[slot][0];
  }

  public getSegments(): SongSegment[][] {
    return this.segments;
  }

  public getPercentages(): number[] {
    return this.percentages;
  }

  public getRanges(): number[][] {
    return this.ranges;
  }

  public getTotal(): number {
    return this.total;
  }

  public getInfoRange(pBit: number): number {
    for (let i = 0; i < this.ranges.length; i += 1) {
      if (this.ranges[i][0] < pBit && this.ranges[i][1] > pBit) {
        return i;
      }
    }
    return -1;
  }

  private calcPercentages() {
    for (let i = 0; i < this.segments.length; i += 1) {
      this.percentages[i] = Math.round(this.segments[i].length / this.total);

    }
  }

  private calcRanges() {
    let total: number = 0;
    for (let i = 0; i < this.percentages.length; i += 1) {
      this.ranges[i] = [];
      this.ranges[i].push(total);
      total += (Math.pow(2, BITS) * (this.percentages[i]));
      this.ranges[i].push(total);

    }
  }
}
