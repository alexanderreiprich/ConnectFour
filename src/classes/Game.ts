import { Tile } from "./Tile";
import Console from "./singletons/Console";
import { Line } from "./Line";
import { Statistic } from "./Statistic";
import { User } from "./User";
import { isMinusToken } from "typescript";

export class Game {

  constructor() {}

  public rows: Line[] = [];
  public columns: Line[] = [];
  public diagonalsTopToBottom: Line[] = [];
  public diagonalsBottomToTop: Line[] = [];
  public field: Tile[][] = [];
  public currentPlayer: string = "X"
  public winCon: number = 0;
  public user: User = new User("temp", "temp");
  private callback: Function = new Function();
  private ai: boolean = false;

  public startGame(_rows: number, _cols: number, _winCon: number, _ai: boolean, _user: User, _callback: Function): void {
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

    //TODO: Math.min nutzen
    function calcMin(x: number, y: number): number {
      return (x < y) ? x : y;
    }

    function calcMin3(x: number, y: number, z: number) : number {
      return calcMin(calcMin(x, y), z);
    }

    function calcMax(x: number, y: number): number {
      return (x > y) ? x : y;
    }

    function fillDiagonals(): void {
      for (let line = 0; line < (_rows+_cols-1); line++) {
        let startCol = calcMax(0, line - _rows);
        let count = calcMin3(line, (_cols - startCol), _rows);
        this.diagonalsBottomToTop.push(new Line(count, line, []));
        for (let j = 0; j < count; j++) {
          this.diagonals[line].content.push(new Tile([(calcMin(_rows, line)) - j - 1, (startCol + j)], " "));
        }
        console.log(this.diagonals[line].content);
      }
  
      // rows + cols - 2 = Gesamtzahl Diagonale pro Durchlauf
      for (let line = 0; line < (_rows+_cols-1); line++) {
        let startCol = calcMin(_cols-1, (_rows+_cols-2) - line);
        let count = calcMin3(line+1, startCol+1, _rows);
        this.diagonals.push(new Line(count, line, []));
        for (let j = 0; j < count; j++) {
          this.diagonals[line].content.push(new Tile([calcMin(line, _rows-1) - j, (startCol - j)], " "));
        }
        console.log(this.diagonals[line].content);
      }
    }
    
    
    
    if (success) {
      Console.printLine("\nGame initialized!\n");
      //this.nextMove();
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

  // TODO: check for game draw

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
    let playerWon: boolean = _winner == "X" ? true : false; 
    Console.printLine("\n" + _winner + " won this game by getting " + this.winCon + " chips in a row! Congratulations!\n");
    // TODO: Update Statistics
    this.user.statistic.refreshStatistic(this.user, playerWon);
    this.callback(true);
  }
}