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
  create(createOfferDto: CreateOfferDto) {
    return this.offerRepository.save(createOfferDto);
  }

  findAll() {
    return this.offerRepository.find();
  }

  findOne(offerId: string) {
    return this.offerRepository.findOne({
      where: { offerId },
    });
  }

  update(offerId: string, updateOfferDto: UpdateOfferDto) {
    return this.offerRepository.update({ offerId }, { ...updateOfferDto });
  }

  remove(offerId: string) {
    return this.offerRepository.delete({ offerId });
  }
}
