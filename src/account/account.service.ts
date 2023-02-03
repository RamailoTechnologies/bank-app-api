import { BadRequestException, Injectable } from '@nestjs/common';
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
        bankId: eachId,
      });
    });

    return data;
  }

  async update(accountId: string, updateAccountDto: UpdateAccountDto) {
    const { bankId, branchIfsc } = updateAccountDto;
    console.log(branchIfsc);
    delete updateAccountDto.branchIfsc;
    try {
      if (!bankId) {
        const datas = await this.accountRepository.update(
          { accountId },
          {
            ...updateAccountDto,
            branch: { branchIfsc },
          },
        );
        return datas;
      } else {
        const data = bankId.map(async (eachId) => {
          const datas = await this.accountRepository.update(
            { accountId },
            {
              ...updateAccountDto,
              branch: { branchIfsc },
            },
          );
        });
        return data;
      }
    } catch (err) {
      throw new BadRequestException(err.driverError.detail);
    }
  }

  // async find(userId: string) {
  //   return await this.accountRepository.find({
  //     where: { user: { userId } },
  //     relations: { bank: true, branch: true },
  //   });
  // }

  async find(userId: string) {
    // return await this.accountRepository.find({
    //   where: { user: { userId } },
    //   relations: { bank: true, branch: true },
    // });
    return await this.accountRepository
      .createQueryBuilder('account')
      .leftJoinAndSelect('account.user', 'user')
      .leftJoinAndSelect('account.bank', 'bank')
      .leftJoinAndSelect('account.branch', 'branch')
      .where('user.userId = :userId', { userId })
      .getMany();
  }

  async remove(userId: string) {
    return await this.accountRepository.delete({ user: { userId } });
  }
}
