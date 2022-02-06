"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileHandler = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
class FileHandler {
    constructor() {
        this.rootDir = [__dirname, "../../../../"];
        if (FileHandler.instance)
            throw new Error("Instead of using new FileHandler(), please use FileHandler.getInstance() for Singleton!");
        FileHandler.instance = this;
    }
    static getInstance() {
        return FileHandler.instance;
    }
    // Returns data of given json
    readJsonFile(_pathToFile) {
        let jsonRaw = (0, fs_1.readFileSync)((0, path_1.resolve)(this.rootDir + _pathToFile));
        let json = JSON.parse(jsonRaw.toString());
        return json;
    }
    // Writes content into the given json
    writeJsonFile(_pathToFile, _dataToFile) {
        let file = this.readJsonFile(_pathToFile);
        file.push(_dataToFile);
        (0, fs_1.writeFileSync)((0, path_1.resolve)(this.rootDir + _pathToFile), JSON.stringify(file));
    }
    // Deletes specific item from given json
    deleteFromJsonFile(_pathToFile, _idOfItem) {
        let json = this.readJsonFile(_pathToFile);
        json.splice(_idOfItem, 1);
        (0, fs_1.writeFileSync)((0, path_1.resolve)(this.rootDir + _pathToFile), JSON.stringify(json));
    }
}
exports.FileHandler = FileHandler;
FileHandler.instance = new FileHandler();
exports.default = FileHandler.getInstance();
//# sourceMappingURL=FileHandler.js.map