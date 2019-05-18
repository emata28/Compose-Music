import {BITS} from "./consts";
import {SongSegment} from "./SongSegment";

export class infoTable {
  private Segments: SongSegment[][]=[[],[],[],[],[],[],[],[],[],[]];
  private Porcentages: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  private Ranges: number[][] = [[],[],[],[],[],[],[],[],[],[]];

  private total =0;
  constructor() {


  }

  public calcData(){
    this.calcPorcentages();
    this.calcRanges();

  }
  public placeSegment(pSegment : SongSegment ,pPorcentage:number) {
    console.log(pPorcentage/10)
    this.Segments[Math.floor(pPorcentage/10)].push(pSegment)
    this.total++;
  }
  private calcPorcentages(){
    for(let i = 0; i <this.Segments.length;i++){
      this.Porcentages[i]= this.Segments[i].length / this.total;

    }
  }
  private calcRanges(){
    let total:number  = 0;
    for(let i = 0; i <this.Porcentages.length;i++){
      this.Ranges[i].push(total) ;
      total+=(Math.pow(2,BITS) * (this.Porcentages[i]));
      this.Ranges[i].push(total) ;

    }
  }
}
