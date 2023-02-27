import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsString } from 'class-validator';
import { loanCategory } from '../entities/offer.entity';

export class CreateOfferDto {
  @IsString()
  @ApiProperty({ type: 'string', example: 'muddhati Khata' })
  offerTitle: string;

  @IsString()
  @ApiProperty({ type: 'string', example: 'open account' })
  offerDescription: string;

  @IsString()
  @ApiProperty({ type: 'string', example: 'https://google.com' })
  offerLink: string;

  @IsEnum(loanCategory)
  @ApiProperty({ type: 'string', enum: loanCategory })
  category: loanCategory;
}
