import { Module } from '@nestjs/common';
import { BankService } from './bank.service';
import { BankController } from './bank.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bank } from './entities/bank.entity';
import { BankBranch } from './entities/bankbranch.entity';
import { Account } from 'src/account/entities/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bank, BankBranch, Account])],
  controllers: [BankController],
  providers: [BankService],
})
export class BankModule {}
