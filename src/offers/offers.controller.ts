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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Offers')
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  @ApiOperation({ summary: 'Insert offer Provided by bank ' })
  create(@Body() createOfferDto: CreateOfferDto) {
    return this.offersService.create(createOfferDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all Offers ' })
  findAll() {
    return this.offersService.findAll();
  }

  @Get(':offerId')
  @ApiOperation({
    summary: 'Find Individual Offer Provided by Individual bank ',
  })
  findOne(@Param('offerId') offerId: string) {
    return this.offersService.findOne(offerId);
  }

  @Patch(':offerId')
  @ApiOperation({ summary: 'Update Offer Provided by Individual bank ' })
  update(
    @Param('offerId') offerId: string,
    @Body() updateOfferDto: UpdateOfferDto,
  ) {
    return this.offersService.update(offerId, updateOfferDto);
  }

  @Delete(':offerId')
  @ApiOperation({ summary: 'Delete Offer Provided by Individual bank ' })
  remove(@Param('offerId') offerId: string) {
    return this.offersService.remove(offerId);
  }
}
