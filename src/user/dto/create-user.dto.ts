import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    type: 'string',
    example: 'a0f0aff5-de9a-44ba-8ae5-0404a873dfaf',
  })
  userId: string;

  @ApiProperty({ type: 'string', example: '9800000000' })
  phone: string;
}
