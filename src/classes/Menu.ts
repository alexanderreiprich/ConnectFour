import * as readline from "readline";

import Console from "./singletons/Console";
import UserHandler from "./singletons/UserHandler";

import { Answers } from "prompts";
import { User } from "./User";
import { Game } from "./Game";
import { StatisticDao } from "./dao/StatisticDao";

export class Menu {
  public consoleLine: readline.ReadLine;
  constructor() {
    this.consoleLine = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  // Function that is called from the main.ts
  public async runProgram(): Promise<void> {
    this.showOptionsLogin();
  }

  // Shows Start Screen
  public async showOptionsLogin(): Promise<void> {
    let answer: Answers<string> = await Console.showOptions(
      ["Login", "Register", "Start Game as Guest", "Quit Game"],
      "<------ Connect Four ------>"
    );
    this.handleAnswerLogin(answer.value);
  }

  // Handler for input in start screen
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

  // Handler for login and register
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
        success = await UserHandler.register(username.value, password.value);
        if (success) {
          Console.clearConsole();
          Console.printLine("\nRegistration complete! Please log in.\n");
          this.showOptionsLogin();
        }
        else {
          Console.clearConsole();
          Console.printLine("\nUsername is already taken or it contains unsupported characters. Please try again.\n");
          Console.printLine("Keep in mind that only alphanumeric characters are allowed.\n");
          this.showOptionsLogin();
        }
        break;

      case "login":
        success = await UserHandler.login(username.value, password.value)
        if (success) {
          Console.clearConsole();
          Console.printLine("\nHello " + username.value + "!\n");
          this.showMainMenu();
        }
        else {
          Console.clearConsole();
          Console.printLine(
            "\nUsername or Password has been entered incorrectly. Please try again.\n"
          );
          this.showOptionsLogin();
        }
        break;

      case "guest":
        Console.printLine("\nContinuing as guest user...\n");
        this.showMainMenu();
        break;

      default:
        Console.printLine("Task not available!");
    }
  }

  // Shows main menu
  public async showMainMenu(): Promise<void> {
    let answer: Answers<string>;
    if (UserHandler.getCurrentUser().username != "temp") {
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
    this.handleAnswerMainMenu(answer.value, UserHandler.getCurrentUser().username != "temp");
  }

  // Handler for main menu
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

  // Handler for game creation
  public async handleGameCreation(_task: string, _ai: boolean) : Promise<void> {
    Console.clearConsole();
    Console.printLine("\nPlease set up your playing field.");
    Console.printLine("\nMake sure that the field is 3x3 tiles or bigger and that the win condition doesn't exceed the amount of tiles on one axis!\n");
    let game: Game = new Game();
    let yaxis: Answers<string> = await Console.askForAnswers("Tiles on the Y-Axis?", "number");
    let xaxis: Answers<string> = await Console.askForAnswers("Tiles on the X-Axis?", "number");
    let wincon: Answers<string> = await Console.askForAnswers("How many in a row to win?", "number");
    game.startGame(yaxis.value, xaxis.value, wincon.value, _ai, UserHandler.getCurrentUser(), (_success: boolean) => {
      if (_success)
        this.showMainMenu();
      else
        this.handleMainMenu(_task); 
    }); 
  }

  // Handler for selected action in main menu
  public async handleMainMenu(_task: string): Promise<void> {
    Console.clearConsole();
    switch (_task) {
      case "playFriend":
        this.handleGameCreation(_task, false);
        break;

      case "playAI":
        this.handleGameCreation(_task, true);
        break;

      case "statistics":
        this.showStatistic(UserHandler.getCurrentUser());
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

  // Displays statistic for current user
  public async showStatistic(_user: User) : Promise<void> {
    let curUserStatistic: StatisticDao = await _user.returnStatistic(); 
    Console.clearConsole();
    Console.printLine("\nStatistics for " + _user.username + " :");
    Console.printLine("Played Games: " + curUserStatistic.playedGames);
    Console.printLine("Won Games: " + curUserStatistic.wonGames + " | " + ((curUserStatistic.wonGames / curUserStatistic.playedGames)*100).toFixed(1) + "%");
    Console.printLine("Lost Games: " + curUserStatistic.lostGames + " | " + ((curUserStatistic.lostGames / curUserStatistic.playedGames)*100).toFixed(1) + "%\n");
    
    this.showMainMenu();
  }
}