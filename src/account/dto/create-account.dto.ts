import { ApiProperty } from '@nestjs/swagger';
import { Bank } from 'src/bank/entities/bank.entity';

export class CreateAccountDto {
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
  userId: string;
  @ApiProperty({
    type: 'string',
    example: 'a0f0aff5-de9a-44ba-8ae5-0404a873dfaf',
  })
  branchIfsc?: string;

  @ApiProperty({
    type: 'array',
    example: 'a0f0aff5-de9a-44ba-8ae5-0404a873dfaf',
  })
  bankId: [];
}
