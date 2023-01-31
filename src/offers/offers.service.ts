import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Offer } from './entities/offer.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
  ) {}
  create(createOfferDto: CreateOfferDto, bankId: string) {
    return this.offerRepository.save({ ...createOfferDto, bank: { bankId } });
  }

  findAll(bankId: string) {
    return this.offerRepository.find({
      where: { bank: { bankId } },
      relations: { bank: true },
    });
  }

  findOne(offerId: string) {
    return this.offerRepository.findOne({
      where: { offerId },
      relations: { bank: true },
    });
  }

  update(offerId: string, updateOfferDto: UpdateOfferDto) {
    return this.offerRepository.update({ offerId }, { ...updateOfferDto });
  }

  remove(offerId: string) {
    return this.offerRepository.delete({ offerId });
  }
}
