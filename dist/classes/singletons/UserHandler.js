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
exports.UserHandler = void 0;
const StatisticDao_1 = require("../dao/StatisticDao");
const UserDao_1 = require("../dao/UserDao");
const User_1 = require("../User");
const FileHandler_1 = __importDefault(require("./FileHandler"));
class UserHandler {
    constructor() {
        if (UserHandler.instance)
            throw new Error("Instead of using new UserHandler(), please use UserHandler.getInstance() for Singleton!");
        UserHandler.instance = this;
        this.currentUser = new User_1.User("temp", "temp");
    }
    static getInstance() {
        return UserHandler.instance;
    }
    register(_username, _password) {
        return __awaiter(this, void 0, void 0, function* () {
            let allUser = yield FileHandler_1.default.readJsonFile("./data/User.json");
            // Check if chosen username is valid
            let regexpUsername = new RegExp('^[a-zA-Z0-9]*$'); // Matches with input that only includes a-z/A-Z/1-9 chars
            if (!regexpUsername.test(_username))
                return false;
            // Check if chosen username is already in use
            for (let i = 0; i < allUser.length; i++) {
                if (allUser[i].username == _username)
                    return false;
            }
            // Add user to database of user
            FileHandler_1.default.writeJsonFile("./data/User.json", new UserDao_1.UserDao(_username, _password));
            // Add statistics to database of statistics
            FileHandler_1.default.writeJsonFile("./data/Statistic.json", new StatisticDao_1.StatisticDao(0, 0, 0, _username));
            return true;
        });
    }
    login(_username, _password) {
        return __awaiter(this, void 0, void 0, function* () {
            let allUser = yield FileHandler_1.default.readJsonFile("./data/User.json");
            // Check if username and password are correct
            for (let i = 0; i < allUser.length; i++) {
                if (allUser[i].username == _username && allUser[i].password == _password) {
                    this.currentUser = new User_1.User(_username, _password);
                    return true;
                }
            }
            return false;
        });
    }
    getCurrentUser() {
        return this.currentUser;
    }
    setCurrentUser(_newUser) {
        this.currentUser = _newUser;
    }
}
exports.UserHandler = UserHandler;
UserHandler.instance = new UserHandler();
exports.default = UserHandler.getInstance();
//# sourceMappingURL=UserHandler.js.map