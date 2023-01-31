import { ApiProperty } from '@nestjs/swagger';
import { smsBankingFormate } from '../entities/sms-banking.entity';

export class CreateSmsBankingDto {
  @ApiProperty({ type: 'string' })
  smsServiceNumber: string;
  @ApiProperty({ type: 'string', enum: smsBankingFormate })
  category: smsBankingFormate;
  @ApiProperty({ type: 'string' })
  callServiceNumber: string;
  @ApiProperty({ type: 'string' })
  smsPattern: string;
}
