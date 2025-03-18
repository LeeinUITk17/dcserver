import { Controller, Get, Body, UseGuards, Patch, Param } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { AuthGuard } from '@nestjs/passport';
import { StaffGuard } from './../../auth/staff.gaurd';
@Controller('transaction')
@UseGuards(AuthGuard('jwt'), StaffGuard)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  // @Post()
  // create(@Body() createTransactionDto: CreateTransactionDto) {
  //   return this.transactionService.create(createTransactionDto);
  // }

  @Get()
  findAll() {
    return this.transactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionService.update(id, updateTransactionDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.transactionService.remove(id);
  // }
}
