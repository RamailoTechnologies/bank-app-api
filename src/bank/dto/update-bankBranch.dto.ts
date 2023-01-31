import { PartialType } from '@nestjs/swagger';
import { CreateBankBranchDto } from './create-bankbranch.dto';

export class UpdateBankBranch extends PartialType(CreateBankBranchDto) {}
