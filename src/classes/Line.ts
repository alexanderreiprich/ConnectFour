import { Tile } from "./Tile";


export class Line {
  private length: number;
  public content: Tile[];
  private id: number;
  constructor(_length: number, _id: number, _content: Tile[]) {
    this.length = _length;
    this.id = _id;
    this.content = _content
  }

  // Checks line if there is room for a chip
  public checkIfChipPlaceable() : boolean {
    let success: boolean = false;
    for (let i = 0; i < this.content.length; i++) {
      if (this.content[i].value == " ")
        success = true;
    }
    return success;
  }

  // Places chip into line
  public placeChip(_player: string) : void {
    for (let i = this.content.length-1; i >= 0; i--) {
      if (this.content[i].value != "X" && this.content[i].value != "O") {
        this.content[i].value = _player;
        return;
      } 
    }
  }

  // Checks line if win condition is fulfilled
  public checkForWin(_winCon: number) : boolean {
    let counter: number = 0;
    let currentPlayer: string = "";  

    for (let i = 0; i < this.content.length; i++) {
      
      if (this.content[i].value == " ") { // Unclaimed tile
        counter = 0;
        currentPlayer = "";
      }
      else if (this.content[i].value == currentPlayer) { // The player has claimed this tile
        counter++;
      }
      else { // Opponent has claimed this tile
        counter = 1;
        currentPlayer = this.content[i].value;
      }
      if (counter == _winCon)
        return true;
    }
    return false;
  }

}