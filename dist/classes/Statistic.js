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
exports.Statistic = void 0;
const FileHandler_1 = __importDefault(require("./singletons/FileHandler"));
class Statistic {
    constructor(_user) {
        this.playedGames = 0;
        this.wonGames = 0;
        this.lostGames = 0;
        this.user = _user;
    }
    // Refreshes statistic depending on the outcome of the game
    refreshStatistic(_user, _won) {
        return __awaiter(this, void 0, void 0, function* () {
            let statistic = yield _user.returnStatistic();
            statistic.playedGames++;
            if (_won)
                statistic.wonGames++;
            else
                statistic.lostGames++;
            let allStats = yield FileHandler_1.default.readJsonFile("./data/Statistic.json");
            for (let i = 0; i < allStats.length; i++) {
                if (allStats[i].userID === _user.username) {
                    FileHandler_1.default.deleteFromJsonFile("./data/Statistic.json", i);
                }
            }
            FileHandler_1.default.writeJsonFile("./data/Statistic.json", statistic);
        });
    }
}
exports.Statistic = Statistic;
//# sourceMappingURL=Statistic.js.map