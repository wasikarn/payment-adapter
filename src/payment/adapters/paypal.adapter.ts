import { Injectable } from '@nestjs/common';

import { PaypalGateway } from '../gateways/paypal.gateway';
import { IPaymentGateway } from '../interfaces/payment-gateway.interface';
import { IPaymentResult } from '../interfaces/payment-result.interface';
import { IPaypalPaymentResult } from '../interfaces/paypal-payment-result.interface';
import { IPaypalRefundResult } from '../interfaces/paypal-refund-result.interface';
import { IRefundResult } from '../interfaces/refund-result.interface';

@Injectable()
export class PaypalAdapter implements IPaymentGateway {
  constructor(private readonly paypalAdapter: PaypalGateway) {}

  async processPayment(
    amount: number,
    currency: string,
  ): Promise<IPaymentResult> {
    const result: IPaypalPaymentResult = await this.paypalAdapter.createPayment(
      amount,
      currency,
    );

    return {
      success: result.status === 'approved',
      transactionId: result.transactionId,
    };
  }

  async refundPayment(transactionId: string): Promise<IRefundResult> {
    const result: IPaypalRefundResult =
      await this.paypalAdapter.executeRefund(transactionId);

    return {
      success: result.status === 'completed',
      transactionId: result.transactionId,
    };
  }
}
