export class CreatePaymentDto {
  water: number;
  electricity: number;
  month: number;
  year: number;
  membership: number;
  target: number;
  penality: number;
  uchastokId: number;
  readonly SntId: number;


  constructor() {
    this.water = 0;
    this.electricity = 0;
    this.membership = 0;
    this.penality = 0;
    this.target = 0;
  }
}
