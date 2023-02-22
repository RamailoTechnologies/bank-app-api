import { ApiProperty } from '@nestjs/swagger';

export class DeleteAccountDto {
  @ApiProperty({
    type: 'array',
    example: [
      'a0f0aff5-de9a-44ba-8ae5-0404a873dfaf',
      'a0f0aff5-de9a-44ba-8ae5-0404a873dfaf',
    ],
  })
  accountId: [string];
}
