export class StatisticDao {
  public playedGames: number;
  public wonGames: number;
  public lostGames: number;
  public userID: string;
  

  constructor(_playedGames: number, _wonGames: number, _lostGames: number, _userID: string) {
    this.playedGames = _playedGames;
    this.wonGames = _wonGames;
    this.lostGames = _lostGames;
    this.userID = _userID;
  }
}