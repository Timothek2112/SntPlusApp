export class CreatePokazanieDto {
  uchastokId: number;
  water?: number = 0;
  electricity?: number = 0;
  membership?: number = 0;
  penality?: number = 0;
  target?: number = 0;
  month: number;
  year: number;
  isNewCounter?: boolean = false;

  constructor() {
    this.water = 0;
    this.electricity = 0;
    this.membership = 0;
    this.penality = 0;
    this.target = 0;
  }
}
