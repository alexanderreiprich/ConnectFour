export class Tile {
  private position: number[];
  private value: string;
  constructor(_position: number[], _value: string) {
    this.position = _position;
    this.value = _value;
  }
}