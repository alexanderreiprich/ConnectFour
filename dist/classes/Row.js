"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Row = void 0;
const Tile_1 = require("./Tile");
class Row {
    constructor(_length, _id) {
        this.length = _length;
        this.id = _id;
        this.content = this.generateTiles();
    }
    // TODO: Relevant?
    generateTiles() {
        let tileArray = [];
        for (let i = 0; i < this.length; i++) {
            tileArray.push(new Tile_1.Tile([this.id, i], " "));
        }
        return tileArray;
    }
}
exports.Row = Row;
//# sourceMappingURL=Row.js.map