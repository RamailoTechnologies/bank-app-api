import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAccountDto } from './create-account.dto';

export class UpdateAccountDto {
  @ApiProperty({ type: 'string', example: '9865517293812634' })
  accountNumber?: string;
  @ApiProperty({ type: 'string', example: 'Sewak Gautam' })
  accountName?: string;
  @ApiProperty({ type: 'string', example: '1234' })
  amount?: string;
  @ApiProperty({
    type: 'string',
    example: 'a0f0aff5-de9a-44ba-8ae5-0404a873dfaf',
  })
  branchIfsc?: string;
}
