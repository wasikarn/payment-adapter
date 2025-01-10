import { Body, Controller, Param, Post } from '@nestjs/common';

import { IPaymentResult } from '../payment/interfaces/payment-result.interface';
import { IRefundResult } from '../payment/interfaces/refund-result.interface';
import { PaymentService } from '../payment/payment.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post(':orderId/pay')
  payOrder(
    @Param('orderId') orderId: string,
    @Body() body: { amount: number; currency: string },
  ): Promise<IPaymentResult> {
    return this.paymentService.processOrderPayment(body.amount, body.currency);
  }

  @Post(':orderId/refund/:transactionId')
  refundOrder(
    @Param('orderId') orderId: string,
    @Param('transactionId') transactionId: string,
  ): Promise<IRefundResult> {
    return this.paymentService.refundOrderPayment(transactionId);
  }
}
