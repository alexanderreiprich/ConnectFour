import { StatisticDao } from "../dao/StatisticDao";
import { UserDao } from "../dao/UserDao";
import { User } from "../User";
import FileHandler from "./FileHandler";

export class UserHandler {
  private static instance : UserHandler = new UserHandler();
  private currentUser: User;
  private constructor() {
    if(UserHandler.instance) 
      throw new Error("Instead of using new UserHandler(), please use UserHandler.getInstance() for Singleton!")
    UserHandler.instance = this;
    this.currentUser = new User("temp", "temp");
  }

  public static getInstance() : UserHandler {
    return UserHandler.instance;
  }

  public async register(_username: string,_password: string): Promise<Boolean> {
    let allUser: UserDao[] = await FileHandler.readJsonFile("./data/User.json");

    // Check if chosen username is valid
    let regexpUsername = new RegExp('^[a-zA-Z0-9]*$'); // Matches with input that only includes a-z/A-Z/1-9 chars
    if (!regexpUsername.test(_username))
      return false;

    // Check if chosen username is already in use
    for (let i: number = 0; i < allUser.length; i++) {
      if ( allUser[i].username == _username)
        return false
    }

    // Add user to database of user
    FileHandler.writeJsonFile("./data/User.json", new UserDao(_username, _password));

    // Add statistics to database of statistics
    FileHandler.writeJsonFile("./data/Statistic.json", new StatisticDao(0, 0, 0, _username));

    return true;
  }

  public async login(_username: string, _password: string): Promise<Boolean> {
    let allUser: UserDao[] = await FileHandler.readJsonFile("./data/User.json");

    // Check if username and password are correct
    for (let i: number = 0; i < allUser.length; i++) {
      if (allUser[i].username == _username && allUser[i].password == _password) {
        this.currentUser = new User(_username, _password);
        return true;
      }
    }
    return false;
  }

  public getCurrentUser(): User {
    return this.currentUser;
  }

  public setCurrentUser(newUser: User): void {
    this.currentUser = newUser;
  }
}

export default UserHandler.getInstance();