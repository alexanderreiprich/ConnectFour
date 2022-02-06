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
exports.isUsername = exports.User = void 0;
const StatisticDao_1 = require("./dao/StatisticDao");
const FileHandler_1 = __importDefault(require("./singletons/FileHandler"));
const Statistic_1 = require("./Statistic");
class User {
    constructor(_username, _password) {
        this.username = _username;
        this.password = _password;
        this.statistic = new Statistic_1.Statistic(this);
    }
    // Returns statistic of current user
    returnStatistic() {
        return __awaiter(this, void 0, void 0, function* () {
            let allStats = yield FileHandler_1.default.readJsonFile("./data/Statistic.json");
            for (let i = 0; i < allStats.length; i++) {
                if (allStats[i].userID == this.username) {
                    return allStats[i];
                }
            }
            return new StatisticDao_1.StatisticDao(0, 0, 0, this.username);
        });
    }
}
exports.User = User;
function isUsername(username) {
    if (username.length > 3)
        return true;
    return false;
}
exports.isUsername = isUsername;
//# sourceMappingURL=User.js.map