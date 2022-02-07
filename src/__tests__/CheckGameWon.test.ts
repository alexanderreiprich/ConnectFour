import { Line } from "../classes/Line";
import { Tile } from "../classes/Tile";

const line = require("../classes/Line");

describe("This is a test for correct checking of win condition", () => {
  test("Check, if the given line results in a win", () => {

    const winCon: number = 3;

    let tileArray1: Tile[] = [new Tile([0, 0], "X"), new Tile([1, 0], "X"), new Tile([2, 0], "X")]; 
    let tileArray2: Tile[] = [new Tile([0, 0], "X"), new Tile([1, 0], "O"), new Tile([2, 0], "X")]; 
    let tileArray3: Tile[] = [new Tile([0, 2], "X"), new Tile([0, 1], " "), new Tile([0, 0], "X")];
    let tileArray4: Tile[] = [new Tile([0, 0], " "), new Tile([1, 1], " "), new Tile([2, 2], " ")];
    let tileArray5: Tile[] = [new Tile([0, 0], "O"), new Tile([1, 1], "O"), new Tile([2, 2], "O")];

    let Line1: Line = new Line(tileArray1.length, 0, tileArray1);
    let Line2: Line = new Line(tileArray2.length, 0, tileArray2);
    let Line3: Line = new Line(tileArray3.length, 0, tileArray3);
    let Line4: Line = new Line(tileArray4.length, 0, tileArray4);
    let Line5: Line = new Line(tileArray5.length, 0, tileArray5);

    expect(Line1.checkForWin(winCon)).toBe(true);
    expect(Line2.checkForWin(winCon)).toBe(false);
    expect(Line3.checkForWin(winCon)).toBe(false);
    expect(Line4.checkForWin(winCon)).toBe(false);
    expect(Line5.checkForWin(winCon)).toBe(true);
  })
});