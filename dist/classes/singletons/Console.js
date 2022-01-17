"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const prompts_1 = __importDefault(require("prompts"));
class Console {
    constructor() {
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
    printLine(_line) {
        this.consoleLine.write(_line);
        this.consoleLine.write("\n");
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
            initial: 1
        });
    }
    // Ask for text or number input
    askForAnswers(_question, _type) {
        return (0, prompts_1.default)({
            type: _type,
            name: 'value',
            message: _question,
            initial: 1
        });
    }
}
Console.instance = new Console();
exports.default = Console.getInstance();
//# sourceMappingURL=Console.js.map