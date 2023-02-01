import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @ApiOperation({ summary: 'Link Bank to the user' })
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @Patch(':userId')
  @ApiOperation({ summary: 'update user Account' })
  update(
    @Param('userId') userId: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    return this.accountService.update(userId, updateAccountDto);
  }

  @Delete(':userId')
  @ApiOperation({ summary: 'Delete user Account' })
  remove(@Param('userId') id: string) {
    return this.accountService.remove(id);
  }
}
