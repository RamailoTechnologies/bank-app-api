import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { notEqual } from 'assert';
import { Account } from 'src/account/entities/account.entity';
import { Not, Repository } from 'typeorm';
import { CreateBankDto } from './dto/create-bank.dto';
import { CreateBankBranchDto } from './dto/create-bankbranch.dto';
import { UpdateBankDto } from './dto/update-bank.dto';
import { UpdateBankBranch } from './dto/update-bankBranch.dto';
import { Bank } from './entities/bank.entity';
import { BankBranch } from './entities/bankbranch.entity';

@Injectable()
export class BankService {
  constructor(
    @InjectRepository(Bank) private readonly bankRepository: Repository<Bank>,
    @InjectRepository(BankBranch)
    private readonly bankBranchRepository: Repository<BankBranch>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}
  async create(createBankDto: CreateBankDto) {
    return await this.bankRepository.save(createBankDto);
  }

  async createBranch(createBankBranchDto: CreateBankBranchDto, bankId: string) {
    return await this.bankBranchRepository.save({
      ...createBankBranchDto,
      bank: { bankId },
    });
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
  async updateBranch(branchId: string, updateBankBranchDto: UpdateBankBranch) {
    return await this.bankBranchRepository.update(
      { branchIfsc: branchId },
      { ...updateBankBranchDto },
    );
  }

  async remove(bankId: string) {
    return await this.bankRepository.delete(bankId);
  }
}
