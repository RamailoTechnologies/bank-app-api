import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SmsBankingService } from './sms-banking.service';
import { CreateSmsBankingDto } from './dto/create-sms-banking.dto';
import { UpdateSmsBankingDto } from './dto/update-sms-banking.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Sms-Banking')
@Controller('sms-banking')
export class SmsBankingController {
  constructor(private readonly smsBankingService: SmsBankingService) {}

  @Post(':bankId')
  create(
    @Body() createSmsBankingDto: CreateSmsBankingDto,
    @Param('bankId') bankId: string,
  ) {
    return this.smsBankingService.create(createSmsBankingDto, bankId);
  }

  @Get(':bankId')
  findAll(@Param('bankId') bankId: string) {
    return this.smsBankingService.findAll(bankId);
  }

  @Get(':serviceId')
  findOne(@Param('serviceId') serviceId: string) {
    return this.smsBankingService.findOne(serviceId);
  }

  @Patch(':serviceId')
  update(
    @Param('serviceId') serviceId: string,
    @Body() updateSmsBankingDto: UpdateSmsBankingDto,
  ) {
    return this.smsBankingService.update(serviceId, updateSmsBankingDto);
  }

  @Delete(':serviceId')
  remove(@Param('serviceId') serviceId: string) {
    return this.smsBankingService.remove(serviceId);
  }
}
