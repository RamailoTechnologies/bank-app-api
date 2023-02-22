import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Bank } from 'src/bank/entities/bank.entity';

import { User } from 'src/user/entities/user.entity';
import { IFSC } from 'src/ifsc/entities/ifsc.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account, Bank, User])],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
