import { Tile } from "./Tile";
import Console from "./singletons/Console";
import { Line } from "./Line";
import { User } from "./User";

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

  // Starts game with given parameters
  public startGame(_rows: number, _cols: number, _winCon: number, _ai: boolean, _user: User, _callback: Function): void {
    this.ai = _ai;
    this.winCon = _winCon;
    this.user = _user;
    this.callback = _callback;
    let success: boolean = true;
    // Checks if parameters are valid
    if (_rows < 3 || _cols < 3)
      success = false;
    if (_rows < _winCon || _cols < _winCon)
      success = false;

    // Fills Rows and Columns
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

    // Fills Diagonals
    const fillDiagonals = (): void => {
      // Bottom to Top
      for (let line = 0; line < (_rows+_cols-1); line++) {
        let startCol = Math.max(0, line - _rows);
        let count = Math.min(line, (_cols - startCol), _rows);
        this.diagonalsBottomToTop.push(new Line(count, line, []));
        for (let j = 0; j < count; j++) {
          this.diagonalsBottomToTop[line].content.push(new Tile([(Math.min(_rows, line)) - j - 1, (startCol + j)], " "));
        }
        console.log(this.diagonalsBottomToTop[line].content);
      }
  
      // Top to Bottom
      for (let line = 0; line < (_rows+_cols-1); line++) {
        let startCol = Math.min(_cols-1, (_rows+_cols-2) - line); // rows + cols - 2 = Gesamtzahl Diagonale pro Durchlauf
        let count = Math.min(line+1, startCol+1, _rows);
        this.diagonalsTopToBottom.push(new Line(count, line, []));
        for (let j = 0; j < count; j++) {
          this.diagonalsTopToBottom[line].content.push(new Tile([Math.min(line, _rows-1) - j, (startCol - j)], " "));
        }
        console.log(this.diagonalsTopToBottom[line].content);
      }
    }
    
    fillDiagonals();
    
    if (success) {
      Console.printLine("\nGame initialized!\n");
      this.nextMove();
    }
    else {
      Console.printLine("\nGame failed to initialize. Please make sure that the playing field meets the conditions and try again!\n");
      this.callback(false);
    }
    
  }

  // Switches player
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
    if (this.checkForGameDraw()) {
      this.displayField();
      this.endGame(this.currentPlayer, true);
      return;
    }

    if (this.checkForGameWon()) {
      this.displayField();
      this.endGame(this.currentPlayer, false);
      return;
    }
    this.switchPlayer();
    this.ai ? this.aiMove() : this.nextMove()
  }

  // Prints current state of playing field
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

  // TODO: Stopped working after implementing diagonals
  // Calls checkForWin for every direction
  public checkForGameWon() : boolean {
    for (let i = 0; i < this.rows.length; i++) {
      if (this.rows[i].checkForWin(this.winCon))
        return true
    }
    for (let k = 0; k < this.columns.length; k++) {
      if (this.columns[k].checkForWin(this.winCon))
        return true
    }
    for (let j = 0; j < this.diagonalsBottomToTop.length; j++) {
      if (this.diagonalsBottomToTop[j].checkForWin(this.winCon))
        return true
    }
    for (let j = 0; j < this.diagonalsTopToBottom.length; j++) {
      if (this.diagonalsTopToBottom[j].checkForWin(this.winCon))
        return true
    }
    return false;
  }

  // Checks for draw
  public checkForGameDraw(): boolean {
    for (let i = 0; i < this.field.length; i++) {
      for (let j = 0; j < this.field[i].length; j++) {
        if (this.field[i][j].value == " ")
          return false;
      }
    }
    return true;
  }

  // Actions of the AI when playing against the computer
  public aiMove() : void {
    this.displayField();
    let col: number = Math.floor(Math.random() * this.columns.length);
    console.log(col);
    if (this.columns[col].checkIfChipPlaceable()) {
      this.columns[col].placeChip(this.currentPlayer);
      if (this.checkForGameWon()) {
        this.displayField();
        this.endGame(this.currentPlayer, false);
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

  // Ends the game
  public endGame(_winner: string, _draw: boolean) : void {
    let playerWon: boolean = _winner == "X" ? true : false; 
    if (!_draw) {
      Console.printLine("\n" + _winner + " won this game by getting " + this.winCon + " chips in a row! Congratulations!\n");
      this.user.statistic.refreshStatistic(this.user, playerWon);
    }
    else {
      Console.printLine("\nThe game ended in a draw! Nobody won.\n");
      Console.printLine("\nThis game will not be represented in your statistics.\n")
    }
    this.callback(true);
  }
}