export class CreatePaymentDto {
  water: number;
  electricity: number;
  month: number;
  year: number;
  membership: number;
  penality: number;
  userId: number;

  constructor() {
    this.water = 0;
    this.electricity = 0;
    this.membership = 0;
    this.penality = 0;
  }
}
