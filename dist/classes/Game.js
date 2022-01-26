"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const Row_1 = require("./Row");
const Column_1 = require("./Column");
class Game {
    constructor() {
        this.rows = [];
        this.columns = [];
        this.field = [];
    }
    startGame(_rows, _cols, _winCon) {
        for (let i = 0; i < _rows; i++) {
            this.rows.push(new Row_1.Row(_cols, i));
        }
        for (let j = 0; j < _cols; j++) {
            this.columns.push(new Column_1.Column(_rows, j));
        }
        // how to assign the rows to the Tile[][]?
        for (let k = 0; k < _rows; k++) {
            this.field[k] = this.rows[k].content;
        }
    }
}
exports.Game = Game;
//# sourceMappingURL=Game.js.map