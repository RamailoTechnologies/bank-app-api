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
    const bankUserHave = await this.accountRepository
      .createQueryBuilder('account')
      .leftJoin('account.branch', 'BankBranch')
      .leftJoin('BankBranch.bank', 'bank')
      .leftJoin('account.user', 'user')
      .where('user.userId = :userId', { userId })
      .select(['account.accountId', 'bank.bankName', 'bank.logo'])
      .getRawMany();

    return bankUserHave;
  }

  // async fetchBankBasedOnUser(userId: string) {
  //   const BankUserHave = await this.bankRepository.find({
  //     where: { branch: { account: { user: { userId } } } },
  //     relations: {
  //       branch: { account: { user: true } },
  //     },
  //   });

  //   const BankUserNothave = await this.bankRepository.find({
  //     where: { branch: { account: { user: { userId: Not(userId) } } } },
  //     relations: {
  //       branch: { account: { user: true } },
  //     },
  //   });
  //   console.log(BankUserNothave);
  //   console.log(BankUserHave);
  //   return { BankUserHave, BankUserNothave };
  // }

  async fetchBankBasedOnUser(userId: string) {
    const bankUserHave = await this.accountRepository
      .createQueryBuilder('account')
      .leftJoin('account.branch', 'BankBranch')
      .leftJoin('BankBranch.bank', 'bank')
      .leftJoin('account.user', 'user')
      .where('user.userId = :userId', { userId })
      .select(['account.accountId', 'bank.bankName', 'bank.logo'])
      .getRawMany();

    const bankUserNotHave = await this.accountRepository
      .createQueryBuilder('account')
      .leftJoin('account.branch', 'BankBranch')
      .leftJoin('BankBranch.bank', 'bank')
      .leftJoin('account.user', 'user')
      .where('user.userId <> :userId', { userId })
      .orWhere('user.userId is NULL')
      .select(['bank.bankName', 'bank.logo'])
      .getRawMany();
    console.log(bankUserNotHave);

    return { bankUserHave, bankUserNotHave };
  }

  async findOne(bankId: string) {
    return await this.bankRepository.findOneBy({ bankId });
  }

  async update(bankId: string, updateBankDto: UpdateBankDto) {
    return await this.bankRepository.update({ bankId }, { ...updateBankDto });
  }
  async updateBranch(branchId: string, updateBankBranchDto: UpdateBankBranch) {
    return await this.bankBranchRepository.update(
      { branchId },
      { ...updateBankBranchDto },
    );
  }

  async remove(bankId: string) {
    return await this.bankRepository.delete(bankId);
  }
}
