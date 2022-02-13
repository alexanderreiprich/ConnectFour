import { StatisticDao } from "./dao/StatisticDao";
import FileHandler from "./singletons/FileHandler";
import { User } from "./User";

export class Statistic {

  public playedGames: number;
  public wonGames: number;
  public lostGames: number;
  public user: User;

  constructor(_user: User) {
    this.playedGames = 0;
    this.wonGames = 0;
    this.lostGames = 0;
    this.user = _user;
  }

  // Refreshes statistic depending on the outcome of the game
  public async refreshStatistic(_user: User, _won: boolean): Promise<void> {
    let statistic: StatisticDao = await _user.returnStatistic();
    statistic.playedGames++;
    if (_won)
      statistic.wonGames++;
    else
      statistic.lostGames++;
    
    let allStats: StatisticDao[] = await FileHandler.readJsonFile("./data/Statistic.json");
    for (let i = 0; i < allStats.length; i++) {
      if (allStats[i].userID === _user.username) {
        FileHandler.deleteFromJsonFile("./data/Statistic.json", i);
      }
    }
    
    FileHandler.writeJsonFile("./data/Statistic.json", statistic);
  }

}