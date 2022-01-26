import { Tile } from "./Tile";

export class Column {

  private length: number;
  private content: Tile[];
  private id: number;
  constructor(_length: number, _id: number) {
    this.length = _length;
    this.id = _id;
    this.content = this.generateTiles();
  }

  private generateTiles(): Tile[] {
    let tileArray: Tile[] = [];
    for(let i = 0; i < this.length; i++) {
      tileArray.push(new Tile([i, this.id], ""));
    }
    return tileArray;
  }

}