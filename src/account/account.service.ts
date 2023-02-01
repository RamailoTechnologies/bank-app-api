import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bank } from 'src/bank/entities/bank.entity';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}
  async create(createAccountDto: CreateAccountDto) {
    const { userId, bankId, branchId } = createAccountDto;
    delete createAccountDto.userId;
    delete createAccountDto.bankId;
    const datas = await this.accountRepository.save({
      ...createAccountDto,
      user: { userId },
      branchId,
      bank: { bankId },
    });

    return datas;
  }

  async update(userId: string, updateAccountDto: UpdateAccountDto) {
    const { bankId } = updateAccountDto;
    return await this.accountRepository.update(
      { user: { userId } },
      { ...updateAccountDto, bank: { bankId } },
    );
  }

  async remove(userId: string) {
    return await this.accountRepository.delete({ user: { userId } });
  }
}
