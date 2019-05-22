import stringHash from 'string-hash';

export class DumbMap {
  private readonly list: any[];

  constructor() {
    this.list = [];
  }

  public get(x: any) {
    return this.list[stringHash(x)];
  }

  public set(x: any, y: any) {
    this.list[stringHash(x)] = y;
  }
}
