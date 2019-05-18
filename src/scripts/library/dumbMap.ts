let hash = require('string-hash');

export class DumbMap {
  private readonly list: any[];
  constructor() {
    this.list = [];
  }

  public get(x: any) {
    return this.list[hash(x)];
  }

  public set(x: any, y: any) {
    this.list[hash(x)] = y;
  }
}
