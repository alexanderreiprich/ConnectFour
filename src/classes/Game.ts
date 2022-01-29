import { Row } from "./Row";
import { Column } from "./Column";
import { Tile } from "./Tile";
import Console from "./singletons/Console";
import { Menu } from "./Menu";
import { Line } from "./Line";

export class Game {

  constructor() {}

  public rows: Line[] = [];
  public columns: Line[] = [];
  public diagonals: Line[] = [];
  public field: Tile[][] = [];
  public currentPlayer: string = "X"
  public winCon: number = 0;
  public user: string = "";
  private callback: Function = new Function();
  private ai: boolean = false;

  public startGame(_rows: number, _cols: number, _winCon: number, _ai: boolean, _user: string, _callback: Function): void {
    this.ai = _ai;
    this.winCon = _winCon;
    this.user = _user;
    this.callback = _callback;
    let success: boolean = true;
    if (_rows < 3 || _cols < 3)
      success = false;
    if (_rows < _winCon || _cols < _winCon)
      success = false;

    for (let y = 0; y < _rows; y++) {
      this.field[y] = [];
      for (let x = 0; x < _cols; x++) {
        if (y == 0) {
          this.columns.push(new Line(_rows, x, []));
        }
        this.field[y].push(new Tile([y, x], " "));
        this.columns[x].content.push(this.field[y][x]);
      }
      this.rows.push(new Line(_cols, y, this.field[y]));
    }

    if (success) {
      Console.printLine("\nGame initialized!\n");
      this.nextMove();
    }
    else {
      Console.printLine("\nGame failed to initialize. Please make sure that the playing field meets the conditions and try again!\n");
      this.callback(false);
    }
    
  }

  public switchPlayer(): void {
    this.currentPlayer == "X" ? this.currentPlayer = "O": this.currentPlayer = "X";
  }

 

  public async nextMove() : Promise<void> {
    this.displayField();
    let target = await Console.askForChipPlacement(this.columns.length);
    let targetCol: number = target.value - 1;

    if (targetCol > this.columns.length) {
      Console.printLine("Invalid position. Please choose a different column.");
      this.nextMove();
      return;
    }

    if (this.columns[targetCol].checkIfChipPlaceable())
      this.columns[targetCol].placeChip(this.currentPlayer);
    else {
      Console.printLine("You can't place a chip in this column. Please choose a different column.");
      this.nextMove();
      return;
    }

    if (this.checkForGameWon()) {
      this.displayField();
      this.endGame(this.currentPlayer);
      return;
    }
    this.switchPlayer();
    this.ai ? this.aiMove() : this.nextMove()
  }

  public displayField() : void {
    let header: string = "";
    for (let x = 1; x < this.columns.length + 1; x++) {
      header += "| " + x + " |";
    }
    Console.printLine(header, true);
    for (let i = 0; i < this.rows.length; i++) {
      let singleRow = "";
      for (let k = 0; k < this.rows[i].content.length; k++) {
        singleRow += "[ " + this.rows[i].content[k].value + " ]";
      }
      Console.printLine(singleRow);
    }
    
  }

  public checkForGameWon() : boolean {
    for (let i = 0; i < this.rows.length; i++) {
      if (this.rows[i].checkForWin(this.winCon))
        return true
    }
    for (let k = 0; k < this.columns.length; k++) {
      if (this.columns[k].checkForWin(this.winCon))
        return true
    }
    return false;
  }

  public aiMove() : void {
    this.displayField();
    let col: number = Math.floor(Math.random() * this.columns.length);
    console.log(col);
    if (this.columns[col].checkIfChipPlaceable()) {
      this.columns[col].placeChip(this.currentPlayer);
      if (this.checkForGameWon()) {
        this.displayField();
        this.endGame(this.currentPlayer);
        return;
      }
      this.switchPlayer();
      this.nextMove();
    }
    else {
      this.aiMove();
      return;
    }
  }

  public endGame(_winner: string) : void {
    Console.printLine("\n" + _winner + " won this game by getting " + this.winCon + " chips in a row! Congratulations!\n");
    this.callback(true);
  }
}