import { CreatePaymentDto } from './create-payment.dto';

export class DebtDto {
  waterDebt: number;
  electrDebt: number;
  membershipDebt: number;
  penalityDebt: number;

  applyPayment(payments: CreatePaymentDto) {
    this.waterDebt -= payments.water;
    this.electrDebt -= payments.electricity;
    this.membershipDebt -= payments.membership;
    this.penalityDebt -= payments.penality;
  }
}
