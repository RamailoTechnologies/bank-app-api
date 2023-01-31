import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Offers')
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post(':bankId')
  create(@Body() createOfferDto: CreateOfferDto, bankId: string) {
    return this.offersService.create(createOfferDto, bankId);
  }

  @Get(':bankId')
  findAll(@Param('bankId') bankId: string) {
    return this.offersService.findAll(bankId);
  }

  @Get(':offerId')
  findOne(@Param('offerId') offerId: string) {
    return this.offersService.findOne(offerId);
  }

  @Patch(':offerId')
  update(
    @Param('offerId') offerId: string,
    @Body() updateOfferDto: UpdateOfferDto,
  ) {
    return this.offersService.update(offerId, updateOfferDto);
  }

  @Delete(':offerId')
  remove(@Param('offerId') offerId: string) {
    return this.offersService.remove(offerId);
  }
}
