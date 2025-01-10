import { IPaymentResult } from './payment-result.interface';
import { IRefundResult } from './refund-result.interface';

export interface IPaymentGateway {
  processPayment(amount: number, currency: string): Promise<IPaymentResult>;
  refundPayment(transactionId: string): Promise<IRefundResult>;
}
