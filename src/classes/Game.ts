import { Row } from "./Row";
import { Column } from "./Column";
import { Tile } from "./Tile";

export class Game {

  constructor() {}

  public rows: Row[] = [];
  public columns: Column[] = [];
  public field: Tile[][] = [];

  public startGame(_rows: number, _cols: number, _winCon: number): void {
    for (let i = 0; i < _rows; i++) {
      this.rows.push(new Row(_cols, i));
    }
    for (let j = 0; j < _cols; j++) {
      this.columns.push(new Column(_rows, j));
    }
    // how to assign the rows to the Tile[][]?
    for (let k = 0; k < _rows; k++) {
      this.field[k] = this.rows[k].content;  
    }
  }
}