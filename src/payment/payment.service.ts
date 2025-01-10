import { Inject, Injectable, Logger } from '@nestjs/common';

import { IPaymentGateway } from './interfaces/payment-gateway.interface';
import { IPaymentResult } from './interfaces/payment-result.interface';
import { IRefundResult } from './interfaces/refund-result.interface';

@Injectable()
export class PaymentService {
  private readonly logger: Logger = new Logger(PaymentService.name);

  constructor(
    @Inject('PAYMENT_GATEWAY') private readonly paymentGateway: IPaymentGateway,
  ) {}

  async processOrderPayment(
    amount: number,
    currency: string,
  ): Promise<IPaymentResult> {
    const result: IPaymentResult = await this.paymentGateway.processPayment(
      amount,
      currency,
    );

    if (result.success) {
      this.logger.log(
        `Payment successful. Transaction ID: ${result.transactionId}`,
      );
    } else {
      this.logger.error(`Payment failed: ${result.message}`);
    }

    return result;
  }

  async refundOrderPayment(transactionId: string): Promise<IRefundResult> {
    const result: IRefundResult =
      await this.paymentGateway.refundPayment(transactionId);

    if (result.success) {
      this.logger.log(`Refund successful. Transaction ID: ${transactionId}`);
    } else {
      this.logger.error(`Refund failed: ${result.message}`);
    }

    return result;
  }
}
