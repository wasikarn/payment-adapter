import { Module } from '@nestjs/common';

import { PaypalGateway } from './gateways/paypal.gateway';
import { StripeGateway } from './gateways/stripe.gateway';
import { PaymentService } from './payment.service';

@Module({
  exports: [PaymentService],
  providers: [
    PaymentService,
    StripeGateway,
    PaypalGateway,
    {
      provide: 'PAYMENT_GATEWAY',
      useClass:
        process.env.PAYMENT_GATEWAY === 'paypal'
          ? PaypalGateway
          : StripeGateway,
    },
  ],
})
export class PaymentModule {}
