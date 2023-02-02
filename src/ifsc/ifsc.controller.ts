import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { IfscService } from './ifsc.service';
import { findIfscDto } from './dto/create-ifsc.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('ifsc')
@ApiTags('IFSC')
export class IfscController {
  constructor(private readonly ifscService: IfscService) {}

  @Get('bank')
  @ApiOperation({ summary: 'Find All Bank' })
  findBank() {
    return this.ifscService.findBank();
  }

  @Get()
  @ApiOperation({
    summary: 'Find State of Individual bank by Providing Bank Name',
  })
  getBankState(@Query('bank') bank: string) {
    return this.ifscService.getBankState(bank);
  }

  @Get(':bank')
  @ApiOperation({
    summary: 'Find city of Individual bank by providing Bank Name and state',
  })
  findCity(@Param('bank') bank: string, @Query('state') state: string) {
    return this.ifscService.findCity(bank, state);
  }

  @Get(':bank/:state')
  @ApiOperation({
    summary:
      'Find Branch of Individual bank by providing Bank Name, state and city',
  })
  findBranch(
    @Param('bank') bank: string,
    @Param('state') state: string,
    @Query('city') city: string,
  ) {
    return this.ifscService.findBranch(bank, state, city);
  }

  @Post()
  @ApiOperation({
    summary:
      'Find full details of Individual bank of individual branch by providing Bank Name, state , city and branch Name ',
  })
  findIfsc(@Body() findIfscDto: findIfscDto) {
    return this.ifscService.findIfsc(findIfscDto);
  }
}
