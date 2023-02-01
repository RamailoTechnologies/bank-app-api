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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Sms-Banking')
@Controller('sms-banking')
export class SmsBankingController {
  constructor(private readonly smsBankingService: SmsBankingService) {}

  @Post(':bankId')
  @ApiOperation({ summary: 'Inser Banking Service' })
  create(
    @Body() createSmsBankingDto: CreateSmsBankingDto,
    @Param('bankId') bankId: string,
  ) {
    return this.smsBankingService.create(createSmsBankingDto, bankId);
  }

  @Get(':bankId')
  @ApiOperation({ summary: 'Fetch all Banking Service of individual bank ' })
  findAll(@Param('bankId') bankId: string) {
    return this.smsBankingService.findAll(bankId);
  }

  @Get(':serviceId')
  @ApiOperation({ summary: 'Fetch One Banking Service of individual bank ' })
  findOne(@Param('serviceId') serviceId: string) {
    return this.smsBankingService.findOne(serviceId);
  }

  @Patch(':serviceId')
  @ApiOperation({ summary: 'Update Banking Service of individual bank ' })
  update(
    @Param('serviceId') serviceId: string,
    @Body() updateSmsBankingDto: UpdateSmsBankingDto,
  ) {
    return this.smsBankingService.update(serviceId, updateSmsBankingDto);
  }

  @Delete(':serviceId')
  @ApiOperation({ summary: 'Delete Banking Service of individual bank ' })
  remove(@Param('serviceId') serviceId: string) {
    return this.smsBankingService.remove(serviceId);
  }
}
