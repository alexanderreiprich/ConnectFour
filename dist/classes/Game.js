"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const Row_1 = require("./Row");
const Column_1 = require("./Column");
const Console_1 = __importDefault(require("./singletons/Console"));
class Game {
    constructor() {
        this.rows = [];
        this.columns = [];
        this.field = [];
        this.currentPlayer = "X";
    }
    startGame(_rows, _cols, _winCon) {
        let success = true;
        if (_rows < 3 || _cols < 3)
            success = false;
        if (_rows < _winCon || _cols < _winCon)
            success = false;
        for (let i = 0; i < _rows; i++) {
            this.rows.push(new Row_1.Row(_cols, i));
        }
        for (let j = 0; j < _cols; j++) {
            this.columns.push(new Column_1.Column(_rows, j));
        }
        for (let k = 0; k < _rows; k++) {
            this.field[k] = this.rows[k].content;
        }
        if (success) {
            Console_1.default.printLine("\nGame initialized!\n");
            return true;
        }
        else {
            Console_1.default.printLine("\nGame failed to initialize. Please make sure that the playing field meets the conditions and try again!\n");
            return false;
        }
    }
    switchPlayer() {
        this.currentPlayer == "X" ? this.currentPlayer = "O" : this.currentPlayer = "X";
    }
    checkIfChipPlaceable(_col) {
        let success = false;
        for (let i = 0; i < this.columns[_col].length; i++) {
            if (this.columns[_col].content[i].value == "")
                success = true;
        }
        return success;
    }
    placeChip(_col) {
        for (let i = this.columns[_col].length - 1; i > 0; i--) {
            if (this.columns[_col].content[i].value == "")
                this.field[i][_col].value = this.currentPlayer;
            return;
        }
    }
    nextMove() {
        return __awaiter(this, void 0, void 0, function* () {
            this.displayField();
            let targetCol = yield Console_1.default.askForAnswers("Where do you want to place your chip?", "number");
            if (this.checkIfChipPlaceable(targetCol.value))
                this.placeChip(targetCol.value);
            else {
                Console_1.default.printLine("Invalid position. Please choose a different column.");
                this.nextMove();
            }
            this.switchPlayer();
            this.nextMove();
        });
    }
    displayField() {
        for (let i = 0; i < this.rows.length; i++) {
            let singleRow = "";
            for (let k = 0; k < this.rows[i].content.length; k++) {
                singleRow += "[ " + this.rows[i].content[k].value + " ]";
            }
            Console_1.default.printLine(singleRow);
        }
    }
}
exports.Game = Game;
//# sourceMappingURL=Game.js.map