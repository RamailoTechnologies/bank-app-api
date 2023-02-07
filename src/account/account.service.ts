import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { Bank } from 'src/bank/entities/bank.entity';
import { BankBranch } from 'src/bank/entities/bankbranch.entity';
import { IFSC } from 'src/ifsc/entities/ifsc.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Bank) private readonly bankRepository: Repository<Bank>,
    @InjectRepository(BankBranch)
    private readonly bankbranchRepository: Repository<BankBranch>,
    @InjectRepository(IFSC)
    private readonly ifscRepository: Repository<IFSC>,
  ) {}
  async create(createAccountDto: CreateAccountDto) {
    try {
      const { userId, bankId } = createAccountDto;
      const checkUser = await this.userRepository.findBy({ userId });
      if (!checkUser) throw new NotFoundException('User Not Found');

      const bankcheck = bankId.map(async (eachId) => {
        const checkbank = await this.bankRepository.find({
          where: { bankId: eachId },
        });
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
        const datas = await this.accountRepository.save({
          ...createAccountDto,
          user: { userId },
          bank: { bankId: eachId },
        });
      });

      return data;
    } catch (err) {
      console.error(err);
      throw new BadRequestException();
    }
  }

  async update(accountId: string, updateAccountDto: UpdateAccountDto) {
    const { branchIfsc, ...rest } = updateAccountDto;
    const addBranch = await this.checkAndaddBranch(branchIfsc, accountId);
    try {
      const data = await this.accountRepository.update(
        { accountId },
        {
          ...rest,
          branch: { branchIfsc },
        },
      );
      return { data, AddedBranch: addBranch };
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
      .leftJoinAndSelect('account.branch', 'branch')
      .where('user.userId = :userId', { userId })
      .getMany();
  }

  async remove(userId: string) {
    return await this.accountRepository.delete({ user: { userId } });
  }

  async checkAndaddBranch(branchIfsc: string, accountId: string) {
    const userAccount = await this.accountRepository.findOne({
      where: { accountId },
      relations: { bank: true },
    });
    const userBankId = userAccount.bank.bankId;
    const checkOnBranch = await this.bankbranchRepository.findOne({
      where: { branchIfsc },
    });
    if (checkOnBranch) {
      return branchIfsc;
    } else {
      const findDetails = await this.ifscRepository.findOneBy({
        ifsc: branchIfsc,
      });
      if (!findDetails)
        throw new NotFoundException(
          'Ifsc Code Didnt Matched on the Ifsc Database',
        );
      const state = findDetails.state;
      const city = findDetails.city;
      const address = findDetails.address;
      const branchName = findDetails.branch;
      const addBranch = await this.bankbranchRepository.save({
        branchIfsc,
        state,
        city,
        address,
        branchName,
        bank: { bankId: userBankId },
      });
      return addBranch;
    }
  }
}
