import { Module } from '@nestjs/common';
import { InventoryItemService } from './inventory-item.service';
import { InventoryItemController } from './inventory-item.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { TransactionService } from '../inventory-transaction/transaction.service';
@Module({
  imports: [PrismaModule],
  controllers: [InventoryItemController],
  providers: [InventoryItemService, TransactionService],
})
export class InventoryItemModule {}
