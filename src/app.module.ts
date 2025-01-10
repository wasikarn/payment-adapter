import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PaymentModule } from './payment/payment.module';
import { OrderModule } from './order/order.module';

@Module({
  controllers: [],
  imports: [
    ConfigModule.forRoot({ expandVariables: true, isGlobal: true }),
    PaymentModule,
    OrderModule,
  ],
  providers: [],
})
export class AppModule {}
