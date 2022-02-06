"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = void 0;
const Tile_1 = require("./Tile");
class Column {
    constructor(_length, _id) {
        this.length = _length;
        this.id = _id;
        this.content = this.generateTiles();
    }
    // TODO: Relevant?
    generateTiles() {
        let tileArray = [];
        for (let i = 0; i < this.length; i++) {
            tileArray.push(new Tile_1.Tile([i, this.id], " "));
        }
        return tileArray;
    }
}
exports.Column = Column;
//# sourceMappingURL=Column.js.map