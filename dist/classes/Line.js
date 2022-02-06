"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Line = void 0;
class Line {
    constructor(_length, _id, _content) {
        this.length = _length;
        this.id = _id;
        this.content = _content;
    }
    // Checks line if there is room for a chip
    checkIfChipPlaceable() {
        let success = false;
        for (let i = 0; i < this.content.length; i++) {
            if (this.content[i].value == " ")
                success = true;
        }
        return success;
    }
    // Places chip into line
    placeChip(_player) {
        for (let i = this.content.length - 1; i >= 0; i--) {
            if (this.content[i].value != "X" && this.content[i].value != "O") {
                this.content[i].value = _player;
                return;
            }
        }
    }
    // Checks line if win condition is fulfilled
    checkForWin(_winCon) {
        let counter = 0;
        for (let i = 0; i < this.content.length - 1; i++) {
            if (this.content[i] == this.content[i + 1]) {
                counter++;
            }
        }
        if (counter == _winCon)
            return true;
        return false;
    }
}
exports.Line = Line;
//# sourceMappingURL=Line.js.map