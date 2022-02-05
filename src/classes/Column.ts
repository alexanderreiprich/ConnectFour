import { Tile } from "./Tile";

export class Column {

  public length: number;
  public content: Tile[];
  public id: number;
  constructor(_length: number, _id: number) {
    this.length = _length;
    this.id = _id;
    this.content = this.generateTiles();
  }

  // TODO: Relevant?
  private generateTiles(): Tile[] {
    let tileArray: Tile[] = [];
    for(let i = 0; i < this.length; i++) {
      tileArray.push(new Tile([i, this.id], " "));
    }
    return tileArray;
  }

}