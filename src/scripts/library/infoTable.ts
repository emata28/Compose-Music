import {BITS} from './consts';
import {SongSegment} from './SongSegment';

export class infoTable {
  private _Segments: SongSegment[][] = [[], [], [], [], [], [], [], [], [], []];
  private _Porcentages: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  private _Ranges: number[][] = [[], [], [], [], [], [], [], [], [], []];

  private _total = 0;

  constructor() {

  }

  public calcData() {
    this.calcPorcentages();
    this.calcRanges();

  }

  public placeSegment(pSegment: SongSegment, pPorcentage: number) {
    this._Segments[Math.floor(pPorcentage / 10)].push(pSegment);
    this._total++;
  }

  public getFromPorcentage(pPorcentage: number[]){
    let slot =Math.floor(pPorcentage[0] / 10);
    for(let searching= 0;searching<this.Segments[slot].length;searching+=1) {
      if (this.Segments[slot][searching].getPorcentages()[1] == pPorcentage[1] && this.Segments[slot][searching].getPorcentages()[1] == pPorcentage[2]) {
        return this.Segments[slot][searching];

      }
    }
    return this.Segments[slot][0];
  }


  get Segments(): SongSegment[][] {
    return this._Segments;
  }

  get Porcentages(): number[] {
    return this._Porcentages;
  }

  get Ranges(): number[][] {
    return this._Ranges;
  }

  get total(): number {
    return this._total;
  }

  public getInfoRange(pBit: number): number {
    for (let i = 0; i < this._Ranges.length; i += 1) {
      if (this._Ranges[i][0] < pBit && this._Ranges[i][1] > pBit) {
        return i;
      }
    }
    return -1;
  }

  private calcPorcentages() {
    for (let i = 0; i < this._Segments.length; i++) {
      this._Porcentages[i] = this._Segments[i].length / this._total;

    }
  }

  private calcRanges() {
    let total: number = 0;
    for (let i = 0; i < this._Porcentages.length; i++) {
      this._Ranges[i]=[];
      this._Ranges[i].push(total);
      total += (Math.pow(2, BITS) * (this._Porcentages[i]));
      this._Ranges[i].push(total);

    }
  }
}
