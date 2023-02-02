import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { findIfscDto } from './dto/create-ifsc.dto';
import { IFSC } from './entities/ifsc.entity';
import { Repository } from 'typeorm';
import { distinct, find } from 'rxjs';

@Injectable()
export class IfscService {
  constructor(
    @InjectRepository(IFSC) private readonly ifscRepository: Repository<IFSC>,
  ) {}

  async findBank() {
    const banks = await this.ifscRepository
      .createQueryBuilder()
      .distinctOn(['bank'])
      .getMany();
    const eachbank = banks.map((each) => {
      return each.bank;
    });
    return eachbank;
  }

  async getBankState(bank: string) {
    const banks = await this.ifscRepository
      .createQueryBuilder()
      .distinctOn(['state'])
      .where('bank = :bankname', { bankname: bank })
      .getMany();
    const eachbank = banks.map((each) => {
      return each.state;
    });
    return eachbank;
  }

  async findCity(bank: string, state: string) {
    const banks = await this.ifscRepository
      .createQueryBuilder()
      .distinctOn(['city'])
      .where('bank = :bankname', { bankname: bank })
      .andWhere('state = :bankstate', { bankstate: state })
      .getMany();
    const eachbank = banks.map((each) => {
      return each.city;
    });
    return eachbank;
  }
  async findBranch(bank: string, state: string, city: string) {
    const banks = await this.ifscRepository
      .createQueryBuilder()
      .distinctOn(['branch'])
      .where('bank = :bankname', { bankname: bank })
      .andWhere('state = :bankstate', { bankstate: state })
      .andWhere('city = :bankcity', { bankcity: city })

      .getMany();
    const eachbank = banks.map((each) => {
      return each.branch;
    });
    return eachbank;
  }

  async findIfsc(findIfscDto: findIfscDto) {
    const data = await this.ifscRepository.find({ where: { ...findIfscDto } });
    return data;
  }
}
