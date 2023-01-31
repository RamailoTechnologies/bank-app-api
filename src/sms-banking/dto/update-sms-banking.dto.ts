import { PartialType } from '@nestjs/swagger';
import { CreateSmsBankingDto } from './create-sms-banking.dto';

export class UpdateSmsBankingDto extends PartialType(CreateSmsBankingDto) {}
