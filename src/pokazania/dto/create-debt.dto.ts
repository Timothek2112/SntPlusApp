import { CreatePaymentDto } from './create-payment.dto';

export class DebtDto {
  water: number;
  electricity: number;
  membership: number;
  month: number;
  year: number;
  penality: number;
  userId: number;
  lastPokazanieId: number;

  applyPayment(payment: CreatePaymentDto) {
    this.water -= payment.water;
    this.electricity -= payment.electricity;
    this.membership -= payment.membership;
    this.penality -= payment.penality;
  }
}
