import { Module } from '@nestjs/common';
import { ItemResolver } from './item.resolver';
import { ItemService } from './item.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ItemController } from './item.controller';

@Module({
  imports: [PrismaModule],
  providers: [ItemResolver, ItemService],
  controllers: [ItemController],
})
export class ItemModule {}
