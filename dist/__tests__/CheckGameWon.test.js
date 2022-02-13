"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Line_1 = require("../classes/Line");
const Tile_1 = require("../classes/Tile");
const line = require("../classes/Line");
describe("This is a test for correct checking of win condition", () => {
    test("Check, if the given line results in a win", () => {
        const winCon = 3;
        let tileArray1 = [new Tile_1.Tile([0, 0], "X"), new Tile_1.Tile([1, 0], "X"), new Tile_1.Tile([2, 0], "X")];
        let tileArray2 = [new Tile_1.Tile([0, 0], "X"), new Tile_1.Tile([1, 0], "O"), new Tile_1.Tile([2, 0], "X")];
        let tileArray3 = [new Tile_1.Tile([0, 2], "X"), new Tile_1.Tile([0, 1], " "), new Tile_1.Tile([0, 0], "X")];
        let tileArray4 = [new Tile_1.Tile([0, 0], " "), new Tile_1.Tile([1, 1], " "), new Tile_1.Tile([2, 2], " ")];
        let tileArray5 = [new Tile_1.Tile([0, 0], "O"), new Tile_1.Tile([1, 1], "O"), new Tile_1.Tile([2, 2], "O")];
        let Line1 = new Line_1.Line(tileArray1.length, 0, tileArray1);
        let Line2 = new Line_1.Line(tileArray2.length, 0, tileArray2);
        let Line3 = new Line_1.Line(tileArray3.length, 0, tileArray3);
        let Line4 = new Line_1.Line(tileArray4.length, 0, tileArray4);
        let Line5 = new Line_1.Line(tileArray5.length, 0, tileArray5);
        expect(Line1.checkForWin(winCon)).toBe(true);
        expect(Line2.checkForWin(winCon)).toBe(false);
        expect(Line3.checkForWin(winCon)).toBe(false);
        expect(Line4.checkForWin(winCon)).toBe(false);
        expect(Line5.checkForWin(winCon)).toBe(true);
    });
});
//# sourceMappingURL=CheckGameWon.test.js.map