export class StatisticDao {
  public playedGames: Number;
  public wonGames: Number;
  public userID: string;

  constructor(_playedGames: Number, _wonGames: Number, _userID: string) {
    this.playedGames = _playedGames;
    this.wonGames = _wonGames;
    this.userID = _userID;
  }
}