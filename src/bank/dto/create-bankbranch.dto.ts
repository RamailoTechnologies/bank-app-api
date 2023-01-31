import { ApiProperty } from '@nestjs/swagger';

export class CreateBankBranchDto {
  @ApiProperty({ type: 'string' })
  branchName: string;
  @ApiProperty({ type: 'string' })
  address: string;
  @ApiProperty({ type: 'string' })
  ifsc: string;
}
