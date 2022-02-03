import { StatisticDao } from "./dao/StatisticDao";
import FileHandler from "./singletons/FileHandler";
import { Statistic } from "./Statistic";

export class User {

  public username: string;
  private password: string;
  public statistic: Statistic;

  constructor(_username: string, _password: string) {
    this.username = _username;
    this.password = _password;
    this.statistic = new Statistic(this);
  }

  public async returnStatistic(): Promise<StatisticDao> {
    let allStats: StatisticDao[] = await FileHandler.readJsonFile("./data/Statistic.json");
    for (let i = 0; i < allStats.length; i++) {
      if (allStats[i].userID == this.username) {
        return allStats[i];
      }
    }
    return new StatisticDao(0, 0, 0, this.username);
  }
  
}