import { Injectable } from '@nestjs/common';

import { StripeGateway } from '../gateways/stripe.gateway';
import { IPaymentGateway } from '../interfaces/payment-gateway.interface';
import { IPaymentResult } from '../interfaces/payment-result.interface';
import { IRefundResult } from '../interfaces/refund-result.interface';
import { IStripeChangeResult } from '../interfaces/stripe-change-result.interface';
import { IStripeRefundResult } from '../interfaces/stripe-refund-result.interface';

@Injectable()
export class StripeAdapter implements IPaymentGateway {
  constructor(private readonly stripeGateway: StripeGateway) {}

  async processPayment(
    amount: number,
    currency: string,
  ): Promise<IPaymentResult> {
    const result: IStripeChangeResult = await this.stripeGateway.change(
      amount,
      currency,
    );

    return {
      success: result.status === 'succeeded',
      transactionId: result.id,
    };
  }

  async refundPayment(transactionId: string): Promise<IRefundResult> {
    const result: IStripeRefundResult =
      await this.stripeGateway.refund(transactionId);

    return {
      success: result.status === 'succeeded',
      transactionId: result.id,
    };
  }
}
