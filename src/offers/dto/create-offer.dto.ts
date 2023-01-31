import { ApiProperty } from '@nestjs/swagger';

export class CreateOfferDto {
  @ApiProperty({ type: 'string' })
  offerTitle: string;
  @ApiProperty({ type: 'string' })
  offerDescription: string;
  @ApiProperty({ type: 'string' })
  offerLink: string;
  @ApiProperty({ type: 'date' })
  offerValidTill: Date;
}
