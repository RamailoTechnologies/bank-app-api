import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsString } from 'class-validator';
import { loanCategory } from '../entities/offer.entity';

export class CreateOfferDto {
  @IsString()
  @ApiProperty({ type: 'string' })
  offerTitle: string;
  @IsString()
  @ApiProperty({ type: 'string' })
  offerDescription: string;
  @IsString()
  @ApiProperty({ type: 'string' })
  offerLink: string;
  @IsDateString()
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    example: '2017-07-21T17:32:28Z',
  })
  offerValidTill: Date;
  @IsEnum(loanCategory)
  @ApiProperty({ type: 'string', enum: loanCategory })
  category: loanCategory;
}
