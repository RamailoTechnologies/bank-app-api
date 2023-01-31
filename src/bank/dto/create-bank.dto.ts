import { ApiProperty } from '@nestjs/swagger';

export class CreateBankDto {
  @ApiProperty({ type: 'string' })
  bankName: string;
  @ApiProperty({ type: 'string' })
  logo: string;
  @ApiProperty({ type: 'string' })
  customerCareNumber: string;
}
