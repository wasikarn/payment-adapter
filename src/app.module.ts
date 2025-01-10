import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [],
  imports: [ConfigModule.forRoot({ expandVariables: true, isGlobal: true })],
  providers: [],
})
export class AppModule {}
