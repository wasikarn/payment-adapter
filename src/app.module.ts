import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PaymentModule } from './payment/payment.module';

@Module({
  controllers: [],
  imports: [
    ConfigModule.forRoot({ expandVariables: true, isGlobal: true }),
    PaymentModule,
  ],
  providers: [],
})
export class AppModule {}
