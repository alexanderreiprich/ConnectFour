import { Row } from "./Row";
import { Column } from "./Column";
import { Tile } from "./Tile";
import Console from "./singletons/Console";

export class Game {

  constructor() {}

  public rows: Row[] = [];
  public columns: Column[] = [];
  public field: Tile[][] = [];
  public currentPlayer: string = "X"

  public startGame(_rows: number, _cols: number, _winCon: number): boolean {
    
    let success: boolean = true;
    if (_rows < 3 || _cols < 3)
      success = false;
    if (_rows < _winCon || _cols < _winCon)
      success = false;

    for (let i = 0; i < _rows; i++) {
      this.rows.push(new Row(_cols, i));
    }
    for (let j = 0; j < _cols; j++) {
      this.columns.push(new Column(_rows, j));
    }
    for (let k = 0; k < _rows; k++) {
      this.field[k] = this.rows[k].content;
    }

    if (success) {
      Console.printLine("\nGame initialized!\n");
      return true;
    }
    else {
      Console.printLine("\nGame failed to initialize. Please make sure that the playing field meets the conditions and try again!\n");
      return false;
    }
    
  }

  public switchPlayer(): void {
    this.currentPlayer == "X" ? this.currentPlayer = "O": this.currentPlayer = "X";
  }

  public checkIfChipPlaceable(_col: number) : boolean {
    let success: boolean = false;
    for (let i = 0; i < this.columns[_col].length; i++) {
      if (this.columns[_col].content[i].value == "")
        success = true;
    }
    return success;
  }

  public placeChip(_col: number) : void {
    for (let i = this.columns[_col].length-1; i > 0; i--) {
      if (this.columns[_col].content[i].value == "")
        this.field[i][_col].value = this.currentPlayer;
        return;
    }
  }

  public async nextMove() : Promise<void> {
    this.displayField();
    let targetCol = await Console.askForAnswers("Where do you want to place your chip?", "number");
    if (this.checkIfChipPlaceable(targetCol.value))
      this.placeChip(targetCol.value)
    else {
      Console.printLine("Invalid position. Please choose a different column.");
      this.nextMove();
    }
    this.switchPlayer();
    this.nextMove();
  }

  public displayField() : void {
    for (let i = 0; i < this.rows.length; i++) {
      let singleRow = "";
      for (let k = 0; k < this.rows[i].content.length; k++) {
        singleRow += "[ " + this.rows[i].content[k].value + " ]";
      }
      Console.printLine(singleRow);
    }
    
  }
}