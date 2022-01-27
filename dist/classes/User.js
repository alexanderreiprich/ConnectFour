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
exports.User = void 0;
const FileHandler_1 = __importDefault(require("./singletons/FileHandler"));
const SuperUser_1 = require("./SuperUser");
const UserDao_1 = require("./dao/UserDao");
class User extends SuperUser_1.SuperUser {
    register(_username, _password) {
        return __awaiter(this, void 0, void 0, function* () {
            let allUser = yield FileHandler_1.default.readJsonFile("./data/User.json");
            // Check if chosen username is valid
            let regexpUsername = new RegExp('^[a-zA-Z0-9]*$'); // Matches with input that only includes a-z/A-Z chars
            if (!regexpUsername.test(_username))
                return false;
            // Check if chosen username is already in use
            for (let i = 0; i < allUser.length; i++) {
                if (allUser[i].username == _username)
                    return false;
            }
            // Add user to database of user
            FileHandler_1.default.writeJsonFile("./data/User.json", new UserDao_1.UserDao(_username, _password));
            return true;
        });
    }
    login(_username, _password) {
        return __awaiter(this, void 0, void 0, function* () {
            let allUser = yield FileHandler_1.default.readJsonFile("./data/User.json");
            // Check if username and password are correct
            for (let i = 0; i < allUser.length; i++) {
                if (allUser[i].username == _username && allUser[i].password == _password) {
                    return true;
                }
            }
            return false;
        });
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map