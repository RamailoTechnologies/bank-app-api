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
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { DeleteAccountDto } from './dto/delete-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @ApiOperation({ summary: 'Link Bank to the user' })
  @ApiBody({ type: CreateAccountDto })
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'fetch accounts of user' })
  getaccount(@Param('userId') userId: string) {
    return this.accountService.find(userId);
  }

  @Patch(':accountId')
  @ApiOperation({ summary: 'update user Account' })
  update(
    @Param('accountId') accountId: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    return this.accountService.update(accountId, updateAccountDto);
  }

  @Post('/delete')
  @ApiOperation({ summary: 'remove Individual bank of user' })
  @ApiBody({ type: DeleteAccountDto })
  removeBank(@Body() deleteAccountDto: DeleteAccountDto) {
    return this.accountService.removeBank(deleteAccountDto);
  }

  @Delete(':userId')
  @ApiOperation({ summary: 'Delete all Account of user ' })
  remove(@Param('userId') id: string) {
    return this.accountService.remove(id);
  }
}
