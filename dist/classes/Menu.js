"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.Menu = void 0;
const readline = __importStar(require("readline"));
const Console_1 = __importDefault(require("./singletons/Console"));
const User_1 = require("./User");
const Game_1 = require("./Game");
class Menu {
    constructor() {
        this.consoleLine = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.user = new User_1.User();
    }
    showProgramStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            this.showOptionsLogin();
        });
    }
    showOptionsLogin() {
        return __awaiter(this, void 0, void 0, function* () {
            let answer = yield Console_1.default.showOptions(["Login", "Register", "Start Game as Guest", "Quit Game"], "<------ Connect Four ------>");
            this.handleAnswerLogin(answer.value);
        });
    }
    handleAnswerLogin(_answer) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (_answer) {
                case 1:
                    this.handleUser("login");
                    break;
                case 2:
                    this.handleUser("register");
                    break;
                case 3:
                    this.handleUser("guest");
                    break;
                case 4:
                    Console_1.default.closeConsole();
                    break;
                default:
                    Console_1.default.printLine("Option not available!");
            }
        });
    }
    handleUser(_task) {
        return __awaiter(this, void 0, void 0, function* () {
            let username;
            let password;
            if (_task != "guest") {
                username = yield Console_1.default.askForAnswers("Please enter your username!", "text");
                password = yield Console_1.default.askForAnswers("Please enter your password!", "password");
            }
            else {
                username = password = {
                    value: "temp"
                };
            }
            let success = false;
            switch (_task) {
                case "register":
                    success = yield this.user.register(username.value, password.value);
                    if (success) {
                        Console_1.default.printLine("Registration complete! Please log in.");
                        this.handleUser("login");
                    }
                    else {
                        Console_1.default.printLine("\nUsername is already taken or it contains unsupported characters. Please try again.\n");
                        Console_1.default.printLine("Keep in mind that only alphanumeric characters are allowed.\n");
                        this.handleUser("register");
                    }
                    break;
                case "login":
                    success = yield this.user.login(username.value, password.value);
                    if (success) {
                        Console_1.default.printLine("\nHello " + username.value + "!\n");
                        this.showMainMenu(true);
                    }
                    else {
                        Console_1.default.printLine("\nUsername or Password has been entered incorrectly. Please try again.\n");
                        this.handleUser("login");
                    }
                    break;
                case "guest":
                    Console_1.default.printLine("\nContinuing as guest user...\n");
                    this.showMainMenu(false);
                    break;
                default:
                    Console_1.default.printLine("Task not available!");
            }
        });
    }
    showMainMenu(registered) {
        return __awaiter(this, void 0, void 0, function* () {
            let answer;
            if (registered) {
                answer = yield Console_1.default.showOptions(["Play ConnectFour against a friend", "Play ConnectFour against the computer", "View your statistics", "Logout"], "Welcome! What do you want to do?");
            }
            else {
                answer = yield Console_1.default.showOptions(["Play ConnectFour against a friend", "Play ConnectFour against the computer", "Logout"], "Welcome! What do you want to do?");
            }
            this.handleAnswerMainMenu(answer.value, registered);
        });
    }
    handleAnswerMainMenu(_answer, _registered) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (_answer) {
                case 1:
                    this.handleMainMenu("playFriend");
                    break;
                case 2:
                    this.handleMainMenu("playAI");
                    break;
                case 3:
                    if (_registered)
                        this.handleMainMenu("statistics");
                    else
                        this.handleMainMenu("logout");
                    break;
                case 4:
                    this.handleMainMenu("logout");
                    break;
                default:
                    Console_1.default.printLine("Option not available!");
            }
        });
    }
    handleMainMenu(_task) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (_task) {
                case "playFriend":
                    Console_1.default.printLine("\nPlease set up your playing field.");
                    Console_1.default.printLine("\nMake sure that the field is 3x3 tiles or bigger and that the win condition doesn't exceed the amount of tiles on one axis!\n");
                    let game = new Game_1.Game();
                    let yaxis = yield Console_1.default.askForAnswers("Tiles on the Y-Axis?", "number");
                    let xaxis = yield Console_1.default.askForAnswers("Tiles on the X-Axis?", "number");
                    let wincon = yield Console_1.default.askForAnswers("How many in a row to win?", "number");
                    if (game.startGame(yaxis.value, xaxis.value, wincon.value)) {
                        game.nextMove();
                    }
                    else
                        this.handleMainMenu("playFriend");
                    break;
                case "playAI":
                    break;
                case "statistics":
                    break;
                case "logout":
                    Console_1.default.printLine("\nYou have been logged out. See you next time!\n");
                    this.showOptionsLogin();
                    break;
                default:
                    Console_1.default.printLine("Task not available!");
                    break;
            }
        });
    }
}
exports.Menu = Menu;
//# sourceMappingURL=Menu.js.map