import { Module } from '@nestjs/common';
import { SmsBankingService } from './sms-banking.service';
import { SmsBankingController } from './sms-banking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmsBanking } from './entities/sms-banking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SmsBanking])],
  controllers: [SmsBankingController],
  providers: [SmsBankingService],
})
export class SmsBankingModule {}
