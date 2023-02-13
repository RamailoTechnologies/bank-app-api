import { ApiProperty } from '@nestjs/swagger';
import { loanCategory } from '../entities/offer.entity';

export class CreateOfferDto {
  @ApiProperty({ type: 'string' })
  offerTitle: string;
  @ApiProperty({ type: 'string' })
  offerDescription: string;
  @ApiProperty({ type: 'string' })
  offerLink: string;
  @ApiProperty({ type: 'date' })
  offerValidTill: Date;
  @ApiProperty({ type: 'string', enum: loanCategory })
  category: loanCategory;
}
