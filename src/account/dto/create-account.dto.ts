import { ApiProperty } from '@nestjs/swagger';
import { Bank } from 'src/bank/entities/bank.entity';
import { isArray } from 'util';

export class CreateAccountDto {
  @ApiProperty({
    type: 'string',
    example: 'a0f0aff5-de9a-44ba-8ae5-0404a873dfaf',
  })
  userId: string;
  @ApiProperty({
    type: 'array',
    example: ['asdasdasd'],
  })
  bankId: [string];
}
