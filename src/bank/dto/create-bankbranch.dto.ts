import { ApiProperty } from '@nestjs/swagger';

export class CreateBankBranchDto {
  @ApiProperty({ type: 'string' })
  branchIfsc: string;
  @ApiProperty({ type: 'string' })
  branchName: string;
  @ApiProperty({ type: 'string' })
  address: string;
}
