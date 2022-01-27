export class Tile {
  public position: number[];
  public value: string;
  constructor(_position: number[], _value: string) {
    this.position = _position;
    this.value = _value;
  }
}