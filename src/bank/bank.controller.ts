import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BankService } from './bank.service';
import { CreateBankDto } from './dto/create-bank.dto';

import { UpdateBankDto } from './dto/update-bank.dto';

@ApiTags('Bank')
@Controller('bank')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Post()
  @ApiOperation({ summary: 'Add Bank' })
  @ApiBody({ type: CreateBankDto })
  create(@Body() createBankDto: CreateBankDto) {
    return this.bankService.create(createBankDto);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Fetch all Bank based on userhave and userNothave' })
  findBank(@Param('userId') userId: string) {
    return this.bankService.fetchBankBasedOnUser(userId);
  }

  @Get('/all/:userId')
  @ApiOperation({ summary: 'Fetch all bank of user' })
  fetchUserBank(@Param('userId') userId: string) {
    return this.bankService.fetchUserBank(userId);
  }
  @Get()
  @ApiOperation({ summary: 'Fetch all banks' })
  findAll() {
    return this.bankService.findAll();
  }

  @Get(':bankId')
  @ApiOperation({ summary: 'fetch individual Bank' })
  findOne(@Param('bankId') bankId: string) {
    return this.bankService.findOne(bankId);
  }

  @Patch(':bankId')
  @ApiOperation({ summary: 'edit Bank details' })
  update(
    @Param('bankId') bankId: string,
    @Body() updateBankDto: UpdateBankDto,
  ) {
    return this.bankService.update(bankId, updateBankDto);
  }

  @Delete(':bankId')
  @ApiOperation({ summary: 'Delete Bank' })
  remove(@Param('bankId') bankId: string) {
    return this.bankService.remove(bankId);
  }
}
