import * as readline from "readline";

import Console from "./classes/singletons/Console";
import { Answers } from "prompts";

import { User } from "./classes/User";

namespace ConnectFour {
  export class Main {
    public consoleLine: readline.ReadLine;
    private user: User;

    constructor() {
      this.consoleLine = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      this.user = new User();
    }

    public async showProgramStatus(): Promise<void> {
      this.showOptionsLogin();
    }

    public async showOptionsLogin(): Promise<void> {
      let answer: Answers<string> = await Console.showOptions(
        ["Login", "Register", "Start Game as Guest", "Quit Game"],
        "<------ Connect Four ------>"
      );
      this.handleAnswerLogin(answer.value);
    }

    public async handleAnswerLogin(_answer: number): Promise<void> {
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
          Console.closeConsole();
          break;
        default:
          Console.printLine("Option not available!")
      }
    }

    public async handleUser(_task: string): Promise<void> {
      let username: Answers<string>;
      let password: Answers<string>;
      if (_task != "guest") {
        username = await Console.askForAnswers(
          "Please enter your username!",
          "text"
        );
        password = await Console.askForAnswers(
          "Please enter your password!",
          "password"
        );
      }
      else {
        username = password = {
          value: "temp"
        }
      }

      let success: Boolean = false;
      switch (_task) {
        case "register":
          success = await this.user.register(username.value, password.value);
          if (success) {
            Console.printLine("Registration complete! Please log in.");
            this.handleUser("login");
          }
          else {
            Console.printLine("\nUsername is already taken. Please try again.\n");
            this.handleUser("register")
          }
          break;
        
        case "login": 
          success = await this.user.login(username.value, password.value);
          if (success) {
            Console.printLine("\nHello " + username.value + "!\n");
            this.showMainMenu(true);
          }
          else {
            Console.printLine(
              "\nUsername or Password has been entered incorrectly. Please try again.\n"
            );
            this.handleUser("login");
          }
          break;
        
        case "guest":
          Console.printLine("\nContinuing as guest user...\n");
          this.showMainMenu(false);
          break;

        default:
          Console.printLine("Task not available!");
      }
    }

    public async showMainMenu(registered: boolean): Promise<void> {
      let answer: Answers<string>;
      if (registered) {
        answer = await Console.showOptions(
          ["Play ConnectFour against a friend", "Play ConnectFour against the computer", "View your statistics", "Logout"],
          "Welcome! What do you want to do?"
        );
      }
      else {
        answer = await Console.showOptions(
          ["Play ConnectFour against a friend", "Play ConnectFour against the computer", "Logout"],
          "Welcome! What do you want to do?"
        );
      }
      this.handleAnswerMainMenu(answer.value, registered);
    }

    public async handleAnswerMainMenu(_answer: number, _registered: boolean) : Promise<void> {
      switch(_answer) {
        case 1:
          this.handleMainMenu("playFriend");
          break;
        
        case 2:
          this.handleMainMenu("playAI");
          break;
        
        case 3: 
          if(_registered)
            this.handleMainMenu("statistics");
          else
            this.handleMainMenu("logout");
          break

        case 4:
          this.handleMainMenu("logout");
          break

        default:
          Console.printLine("Option not available!");
      }
    }

    public async handleMainMenu(_task: string) {
      switch (_task) {
        case "playFriend":
          break;

        case "playAI":
          break;

        case "statistics":
          break;

        case "logout":
          Console.printLine("\nYou have been logged out. See you next time!\n");
          this.showOptionsLogin();
          break;

        default:
          Console.printLine("Task not available!");
          break;
      }
    }
  }
  let main: Main = new Main();
  main.showProgramStatus();
}