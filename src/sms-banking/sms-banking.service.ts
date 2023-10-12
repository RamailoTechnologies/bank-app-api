import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSmsBankingDto } from './dto/create-sms-banking.dto';
import { UpdateSmsBankingDto } from './dto/update-sms-banking.dto';
import { SmsBanking } from './entities/sms-banking.entity';

@Injectable()
export class SmsBankingService {
  constructor(
    @InjectRepository(SmsBanking)
    private readonly smsBankingRepository: Repository<SmsBanking>,
  ) {}
  async create(createSmsBankingDto: CreateSmsBankingDto, bankId: string) {
    return await this.smsBankingRepository.save({
      ...createSmsBankingDto,
      bank: { bankId },
    });
  }

  async findAll(bankId: string) {
  var response =   await this.smsBankingRepository.find({
      where: { bank: { bankId } },
      relations: { bank: true },
    });
    for (var i = 0; i < response.length; i++) {
        if (response[i].smsPattern == ""){
            response[i].isSms = false;
        }else {
          response[i].isSms = true;
        }
    }
    return response;
  }

  async findOne(serviceId: string) {
    return await this.smsBankingRepository.findOneBy({ serviceId });
  }

  async update(serviceId: string, updateSmsBankingDto: UpdateSmsBankingDto) {
    return await this.smsBankingRepository.update(
      { serviceId },
      { ...updateSmsBankingDto },
    );
  }

  async remove(serviceId: string) {
    return await this.smsBankingRepository.delete({ serviceId });
  }
}
