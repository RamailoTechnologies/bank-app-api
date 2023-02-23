import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bank } from 'src/bank/entities/bank.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { DeleteAccountDto } from './dto/delete-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Bank) private readonly bankRepository: Repository<Bank>,
  ) {}

  async create(createAccountDto: CreateAccountDto) {
    try {
      const { userId, bankId } = createAccountDto;
      const checkUser = await this.userRepository.findBy({ userId });
      if (!checkUser) throw new NotFoundException('User Not Found');

      const bankcheck = bankId.map(async (eachId) => {
        const checkbank = await this.bankRepository.findBy({ bankId: eachId });
        if (!checkbank) throw new NotFoundException('Bank Not Found');
      });

      const bankData = await this.find(userId);

      bankData.map((eachBank) => {
        console.log(eachBank.bank);
        if (bankId.includes(eachBank.bank.bankId)) {
          throw new BadRequestException('This user has already this bank ');
        }
      });

      const data = bankId.map(async (eachId) => {
        delete createAccountDto.bankId;
        const datas = await this.accountRepository.save({
          ...createAccountDto,
          user: { userId },
          bank: { bankId: eachId },
        });
        return datas;
      });

      return data;
    } catch (err) {
      console.error(err);
      throw new BadRequestException();
    }
  }

  async update(accountId: string, updateAccountDto: UpdateAccountDto) {
    try {
      const data = await this.accountRepository.update(
        { accountId },
        updateAccountDto,
      );
      return { data };
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err.driverError);
    }
  }

  async find(userId: string) {
    return await this.accountRepository
      .createQueryBuilder('account')
      .leftJoinAndSelect('account.user', 'user')
      .leftJoinAndSelect('account.bank', 'bank')
      .where('user.userId = :userId', { userId })
      .getMany();
  }

  async remove(userId: string) {
    return await this.accountRepository.delete({ user: { userId } });
  }

  async removeBank(deleteAccountDto: DeleteAccountDto) {
    try {
      const { accountId } = deleteAccountDto;
      const account = await accountId.map(async (eachId) => {
        const checkAccount = await this.accountRepository.findOne({
          where: { accountId: eachId },
        });
        if (checkAccount) {
          await this.accountRepository.delete(accountId);
          console.log('deleted', eachId);
          return { message: `${accountId} was deleted` };
        } else {
          throw new BadRequestException(`${eachId} account doesnot Exist`);
        }
      });
      return { message: `${accountId} was deleted` };
    } catch (err) {
      console.log(err);
    }
  }
}
