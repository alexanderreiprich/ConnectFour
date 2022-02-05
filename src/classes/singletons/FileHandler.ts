import { readFileSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";

export class FileHandler {
  private static instance : FileHandler = new FileHandler();
  private rootDir : Array<string> = [__dirname, "../../../../"];

  private constructor() {
    if(FileHandler.instance) 
      throw new Error("Instead of using new FileHandler(), please use FileHandler.getInstance() for Singleton!")
    FileHandler.instance = this;
  }

  public static getInstance() : FileHandler {
    return FileHandler.instance;
  }

  // Returns data of given json
  public readJsonFile(_pathToFile: string) : any {
    let jsonRaw : Buffer = readFileSync(resolve(this.rootDir + _pathToFile));
    let json : any = JSON.parse(jsonRaw.toString());
    return json;
  }

  // Writes content into the given json
  public writeJsonFile(_pathToFile: string, _dataToFile: any) : void {
    let file: any[] = this.readJsonFile(_pathToFile);
    file.push(_dataToFile);
    writeFileSync(resolve(this.rootDir + _pathToFile), JSON.stringify(file));
  }

  // Deletes specific item from given json
  public deleteFromJsonFile(_pathToFile: string, _idOfItem: number) : void {
    let json: any[] = this.readJsonFile(_pathToFile);
    json.splice(_idOfItem, 1);
    writeFileSync(resolve(this.rootDir + _pathToFile), JSON.stringify(json));
  }

}

export default FileHandler.getInstance();