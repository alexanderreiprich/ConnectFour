"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const prompts_1 = __importDefault(require("prompts"));
class Console {
    constructor() {
        this.lastInputLength = 0;
        this.consoleLine = readline_1.default.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        if (Console.instance)
            throw new Error("Instead of using new Console(), please use Console.getInstance() for Singleton!");
        Console.instance = this;
    }
    static getInstance() {
        return Console.instance;
    }
    // TODO: Check if printText and delete boolean are still required
    // Prints single line of text into console
    printLine(_lines, _delete = false) {
        this.printText([_lines], _delete);
    }
    // Prints multiple lines of text into console
    printText(_lines, _delete = false) {
        if (_delete) {
            console.clear();
        }
        _lines.forEach(line => {
            this.consoleLine.write(line);
            this.consoleLine.write("\n");
        });
        if (_delete) {
            this.lastInputLength = _lines.length;
        }
        else {
            this.lastInputLength += _lines.length;
        }
    }
    // Displaying choice options
    showOptions(_options, _question) {
        let choices = [];
        for (let i = 1; i <= _options.length; i++) {
            choices.push({ title: _options[i - 1], value: i });
        }
        return (0, prompts_1.default)({
            type: 'select',
            name: 'value',
            message: _question,
            choices: choices,
            initial: ""
        });
    }
    // Ask for text or number input
    askForAnswers(_question, _type) {
        return (0, prompts_1.default)({
            type: _type,
            name: 'value',
            message: _question,
            initial: ""
        });
    }
    // Ask for column in which to place the chip
    askForChipPlacement(_maxCols) {
        return (0, prompts_1.default)({
            type: "number",
            name: "value",
            message: "Where do you want to place your chip?",
            initial: 1,
            min: 1,
            max: _maxCols
        });
    }
    // Clears console
    clearConsole() {
        console.clear;
    }
    // Closes console
    closeConsole() {
        this.printLine("Thank you for playing!");
        this.consoleLine.close();
    }
}
Console.instance = new Console();
exports.default = Console.getInstance();
//# sourceMappingURL=Console.js.map