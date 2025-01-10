import { Module } from '@nestjs/common';

import { PaymentModule } from '../payment/payment.module';
import { OrderController } from './order.controller';

@Module({
  controllers: [OrderController],
  imports: [PaymentModule],
})
export class OrderModule {}
