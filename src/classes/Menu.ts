import * as readline from "readline";

import Console from "./singletons/Console";
import { Answers } from "prompts";

import { User } from "./User";
import { Game } from "./Game";
import { getJSDocAugmentsTag } from "typescript";

export class Menu {
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
          Console.printLine("\nUsername is already taken or it contains unsupported characters. Please try again.\n");
          Console.printLine("Keep in mind that only alphanumeric characters are allowed.\n");
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

  public async handleAnswerMainMenu(_answer: number, _registered: boolean): Promise<void> {
    switch (_answer) {
      case 1:
        this.handleMainMenu("playFriend");
        break;

      case 2:
        this.handleMainMenu("playAI");
        break;

      case 3:
        if (_registered)
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
        Console.printLine("\nPlease set up your playing field.");
        Console.printLine("\nMake sure that the field is 3x3 tiles or bigger and that the win condition doesn't exceed the amount of tiles on one axis!\n");
        let game : Game = new Game();
        let yaxis : Answers<string> = await Console.askForAnswers("Tiles on the Y-Axis?", "number");
        let xaxis : Answers<string> = await Console.askForAnswers("Tiles on the X-Axis?", "number");
        let wincon : Answers<string> = await Console.askForAnswers("How many in a row to win?", "number");
        if (game.startGame(yaxis.value, xaxis.value, wincon.value)) {
          game.nextMove();
        }
        else
          this.handleMainMenu("playFriend");
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