import { Module } from '@nestjs/common';
import { SupplierItemService } from './supplier-item.service';
import { SupplierItemController } from './supplier-item.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
@Module({
  imports: [PrismaModule],
  controllers: [SupplierItemController],
  providers: [SupplierItemService],
})
export class SupplierItemModule {}
