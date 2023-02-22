import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSmsBankingDto {
  @IsString()
  @ApiProperty({ type: 'string' })
  smsServiceNumber: string;

  @IsString()
  @ApiProperty({ type: 'string' })
  category: string;

  @IsString()
  @ApiProperty({ type: 'string' })
  callServiceNumber: string;

  @IsString()
  @ApiProperty({ type: 'string' })
  smsPattern: string;
}
