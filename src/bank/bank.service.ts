import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { notEqual } from 'assert';
import { Account } from 'src/account/entities/account.entity';
import { Not, Repository } from 'typeorm';
import { CreateBankDto } from './dto/create-bank.dto';

import { UpdateBankDto } from './dto/update-bank.dto';
import { Bank } from './entities/bank.entity';

@Injectable()
export class BankService {
  constructor(
    @InjectRepository(Bank) private readonly bankRepository: Repository<Bank>,

    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}
  async create(createBankDto: CreateBankDto) {
    return await this.bankRepository.save(createBankDto);
  }

  findAll() {
    return this.bankRepository.find();
  }

  async fetchUserBank(userId: string) {
    const bankUserHave = await this.bankRepository.find({
      where: { account: { user: { userId } } },
    });

    return bankUserHave;
  }

  async fetchBankBasedOnUser(userId: string) {
    const bankUserHave = await this.fetchUserBank(userId);
    const banks = await this.bankRepository.find();

    const bankUSerNotHave = banks.filter((bank) => {
      return !bankUserHave.find((notRelatedBank) => {
        return bank.bankId === notRelatedBank.bankId;
      });
    });

    return { bankUserHave, bankUSerNotHave };
  }

  async findOne(bankId: string) {
    return await this.bankRepository.findOneBy({ bankId });
  }

  async update(bankId: string, updateBankDto: UpdateBankDto) {
    return await this.bankRepository.update({ bankId }, { ...updateBankDto });
  }

  async remove(bankId: string) {
    return await this.bankRepository.delete(bankId);
  }
}
