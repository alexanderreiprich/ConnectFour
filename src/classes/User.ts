import FileHandler from "./singletons/FileHandler";
import { SuperUser } from "./SuperUser";
import { UserDao } from "./dao/UserDao";

export class User extends SuperUser {
  public async register(_username: string,_password: string): Promise<Boolean> {
    let allUser: UserDao[] = await FileHandler.readJsonFile("./data/User.json");

    // Check if chosen username is already in use
    for (let i: number = 0; i < allUser.length; i++) {
      if ( allUser[i].username == _username)
        return false
    }

    // Add user to database of user
    FileHandler.writeJsonFile("./data/User.json", new UserDao(_username, _password));
    return true;
  }

  public async login(_username: string, _password: string): Promise<Boolean> {
    let allUser: UserDao[] = await FileHandler.readJsonFile("./data/User.json");

    // Check if username and password are correct
    for (let i: number = 0; i < allUser.length; i++) {
      if (allUser[i].username == _username && allUser[i].password == _password) {
        return true;
      }
    }
    return false;
  }
}