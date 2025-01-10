import { Logger } from '@nestjs/common';
import { Effect } from 'effect';

import { IStripeChangeResult } from '../interfaces/stripe-change-result.interface';
import { IStripeRefundResult } from '../interfaces/stripe-refund-result.interface';

// Simulate Stripe API
export class StripeGateway {
  private readonly logger: Logger = new Logger(StripeGateway.name);

  async change(amount: number, currency: string): Promise<IStripeChangeResult> {
    const result: Effect.Effect<IStripeChangeResult> = Effect.succeed({
      id: `stripe_ch_${Date.now()}`,
      status: 'succeeded',
    });

    this.logger.log(`Changing ${amount} ${currency} via Stripe`);

    return Effect.runPromise(result);
  }

  async refund(changeId: string): Promise<IStripeRefundResult> {
    const result: Effect.Effect<IStripeRefundResult> = Effect.succeed({
      id: changeId,
      status: 'succeeded',
    });

    this.logger.log(`Refunding ${changeId} via Stripe`);

    return Effect.runPromise(result);
  }
}
