import { StatisticDao } from "./dao/StatisticDao";
import FileHandler from "./singletons/FileHandler";

export class Statistic {

  public playedGames: number;
  public wonGames: number;
  public lostGames: number;
  public user: string;

  constructor(_user: string) {
    this.playedGames = 0;
    this.wonGames = 0;
    this.lostGames = 0;
    this.user = _user;
  }

  public save() : void {
    FileHandler.writeJsonFile("./data/Statistic.json", new StatisticDao(this.playedGames, this.wonGames, this.lostGames, this.user));
  }

  public refreshStatistic(_user: string, _won: boolean) {

  }

  public async returnStatistic(_user: string) : Promise<StatisticDao> {
    let allStats: StatisticDao[] = await FileHandler.readJsonFile("./data/Statistic.json");
    for (let i = 0; i < allStats.length; i++) {
      if (allStats[i].userID == _user) {
        return allStats[i];
      }
    }
    return new StatisticDao(0, 0, 0, _user);
  }
}