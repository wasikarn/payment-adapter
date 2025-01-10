import { Logger } from '@nestjs/common';
import { Effect } from 'effect';

// Simulate Paypal API
import { IPaypalPaymentResult } from '../interfaces/paypal-payment-result.interface';
import { IPaypalRefundResult } from '../interfaces/paypal-refund-result.interface';

export class PaypalGateway {
  private readonly logger: Logger = new Logger(PaypalGateway.name);

  async createPayment(
    amount: number,
    currency: string,
  ): Promise<IPaypalPaymentResult> {
    const result: Effect.Effect<IPaypalPaymentResult> = Effect.succeed({
      status: 'approved',
      transactionId: `paypal_tx_${Date.now()}`,
    });

    this.logger.log(`Creating payment for ${amount} ${currency} via Paypal`);

    return Effect.runPromise(result);
  }

  async executeRefund(changeId: string): Promise<IPaypalRefundResult> {
    const result: Effect.Effect<IPaypalRefundResult> = Effect.succeed({
      status: 'completed',
      transactionId: changeId,
    });

    this.logger.log(`Refunding ${changeId} via Paypal`);

    return Effect.runPromise(result);
  }
}
