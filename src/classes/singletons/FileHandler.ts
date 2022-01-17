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

  public readJsonFile(_pathToFile: string) : any {
    let jsonRaw : Buffer = readFileSync(resolve(this.rootDir + _pathToFile));
    let json : any = JSON.parse(jsonRaw.toString());
    return json;
  }

  public writeJsonFile(_pathToFile : string, _dataToFile: any) : void {
    let file: any[] = this.readJsonFile(_pathToFile)
    file.push(_dataToFile)
    writeFileSync(resolve(this.rootDir + _pathToFile), JSON.stringify(file));
  }

}

export default FileHandler.getInstance();