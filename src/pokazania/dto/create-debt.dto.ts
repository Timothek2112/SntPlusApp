import { CreatePaymentDto } from './create-payment.dto';

export class DebtDto {
  water: number;
  electricity: number;
  membership: number;
  target: number;
  penality: number;
  uchastokId: number;
  readonly SntId: number;

  constructor() {
    this.water = 0;
    this.electricity = 0;
    this.membership = 0;
    this.target = 0;
    this.penality = 0;
  }

  applyPayment(payment: CreatePaymentDto) {
    this.water -= payment.water;
    this.electricity -= payment.electricity;
    this.membership -= payment.membership;
    this.penality -= payment.penality;
    this.target -= payment.target;
  }
}
