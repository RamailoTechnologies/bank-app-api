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
    const { userId, bankId, branchIfsc } = createAccountDto;
    delete createAccountDto.userId;
    delete createAccountDto.bankId;
    const data = bankId.map(async (eachId) => {
      const datas = await this.accountRepository.save({
        ...createAccountDto,
        user: { userId },
        branchIfsc,
        bank: { bankId: eachId },
      });
    });

    return data;
  }

  async update(userId: string, updateAccountDto: UpdateAccountDto) {
    const { bankId, branchIfsc } = updateAccountDto;
    const data = bankId.map(async (eachId) => {
      const datas = await this.accountRepository.update(
        { user: { userId } },
        {
          ...updateAccountDto,
          user: { userId },
          branch: { branchIfsc },
          bank: { bankId: eachId },
        },
      );
    });
    return data;
  }

  async remove(userId: string) {
    return await this.accountRepository.delete({ user: { userId } });
  }
}
