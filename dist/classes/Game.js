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
const Tile_1 = require("./Tile");
const Console_1 = __importDefault(require("./singletons/Console"));
const Line_1 = require("./Line");
const User_1 = require("./User");
class Game {
    constructor() {
        this.rows = [];
        this.columns = [];
        this.diagonalsTopToBottom = [];
        this.diagonalsBottomToTop = [];
        this.field = [];
        this.currentPlayer = "X";
        this.winCon = 0;
        this.user = new User_1.User("temp", "temp");
        this.callback = new Function();
        this.ai = false;
    }
    // Starts game with given parameters
    startGame(_rows, _cols, _winCon, _ai, _user, _callback) {
        this.ai = _ai;
        this.winCon = _winCon;
        this.user = _user;
        this.callback = _callback;
        let success = true;
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
                    this.columns.push(new Line_1.Line(_rows, x, []));
                }
                this.field[y].push(new Tile_1.Tile([y, x], " "));
                this.columns[x].content.push(this.field[y][x]);
            }
            this.rows.push(new Line_1.Line(_cols, y, this.field[y]));
        }
        // Fills Diagonals
        const fillDiagonals = () => {
            // Bottom to Top
            for (let line = 0; line < (_rows + _cols - 1); line++) {
                let startCol = Math.max(0, line - _rows);
                let count = Math.min(line, (_cols - startCol), _rows);
                this.diagonalsBottomToTop.push(new Line_1.Line(count, line, []));
                for (let j = 0; j < count; j++) {
                    this.diagonalsBottomToTop[line].content.push(new Tile_1.Tile([(Math.min(_rows, line)) - j - 1, (startCol + j)], " "));
                }
            }
            // Top to Bottom
            for (let line = 0; line < (_rows + _cols - 1); line++) {
                let startCol = Math.min(_cols - 1, (_rows + _cols - 2) - line); // rows + cols - 2 = Gesamtzahl Diagonale pro Durchlauf
                let count = Math.min(line + 1, startCol + 1, _rows);
                this.diagonalsTopToBottom.push(new Line_1.Line(count, line, []));
                for (let j = 0; j < count; j++) {
                    this.diagonalsTopToBottom[line].content.push(new Tile_1.Tile([Math.min(line, _rows - 1) - j, (startCol - j)], " "));
                }
            }
        };
        fillDiagonals();
        //console.log(this.diagonalsBottomToTop[4].content);
        if (success) {
            Console_1.default.printLine("\nGame initialized!\n");
            this.nextMove();
        }
        else {
            Console_1.default.printLine("\nGame failed to initialize. Please make sure that the playing field meets the conditions and try again!\n");
            this.callback(false);
        }
    }
    // Switches player
    switchPlayer() {
        this.currentPlayer == "X" ? this.currentPlayer = "O" : this.currentPlayer = "X";
    }
    nextMove() {
        return __awaiter(this, void 0, void 0, function* () {
            this.displayField();
            let target = yield Console_1.default.askForChipPlacement(this.columns.length);
            let targetCol = target.value - 1;
            if (targetCol > this.columns.length) {
                Console_1.default.printLine("Invalid position. Please choose a different column.");
                this.nextMove();
                return;
            }
            if (this.columns[targetCol].checkIfChipPlaceable())
                this.columns[targetCol].placeChip(this.currentPlayer);
            else {
                Console_1.default.printLine("You can't place a chip in this column. Please choose a different column.");
                this.nextMove();
                return;
            }
            if (this.checkForGameDraw()) {
                this.displayField();
                this.endGame(this.currentPlayer, true);
                return;
            }
            console.log(this.checkForGameWon());
            if (this.checkForGameWon()) {
                this.displayField();
                this.endGame(this.currentPlayer, false);
                return;
            }
            this.switchPlayer();
            this.ai ? this.aiMove() : this.nextMove();
        });
    }
    // Prints current state of playing field
    displayField() {
        let header = "";
        for (let x = 1; x < this.columns.length + 1; x++) {
            header += "| " + x + " |";
        }
        Console_1.default.printLine(header, true);
        for (let i = 0; i < this.rows.length; i++) {
            let singleRow = "";
            for (let k = 0; k < this.rows[i].content.length; k++) {
                singleRow += "[ " + this.rows[i].content[k].value + " ]";
            }
            Console_1.default.printLine(singleRow);
        }
    }
    // TODO: Stopped working after implementing diagonals
    // Calls checkForWin for every direction
    checkForGameWon() {
        for (let i = 0; i < this.rows.length; i++) {
            if (this.rows[i].checkForWin(this.winCon))
                return true;
        }
        for (let k = 0; k < this.columns.length; k++) {
            if (this.columns[k].checkForWin(this.winCon))
                return true;
        }
        /*     for (let j = 0; j < this.diagonalsBottomToTop.length; j++) {
              if (this.diagonalsBottomToTop[j].checkForWin(this.winCon))
                return true
            }
            for (let h = 0; h < this.diagonalsTopToBottom.length; h++) {
              if (this.diagonalsTopToBottom[h].checkForWin(this.winCon))
                return true
            } */
        return false;
    }
    // Checks for draw
    checkForGameDraw() {
        for (let i = 0; i < this.field.length; i++) {
            for (let j = 0; j < this.field[i].length; j++) {
                if (this.field[i][j].value == " ")
                    return false;
            }
        }
        return true;
    }
    // Actions of the AI when playing against the computer
    aiMove() {
        this.displayField();
        let col = Math.floor(Math.random() * this.columns.length);
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
    endGame(_winner, _draw) {
        let playerWon = _winner == "X" ? true : false;
        if (!_draw) {
            Console_1.default.printLine("\n" + _winner + " won this game by getting " + this.winCon + " chips in a row! Congratulations!\n");
            this.user.statistic.refreshStatistic(this.user, playerWon);
        }
        else {
            Console_1.default.printLine("\nThe game ended in a draw! Nobody won.\n");
            Console_1.default.printLine("\nThis game will not be represented in your statistics.\n");
        }
        this.callback(true);
    }
}
exports.Game = Game;
//# sourceMappingURL=Game.js.map