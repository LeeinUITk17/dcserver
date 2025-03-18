import { Module } from '@nestjs/common';
import { MenuitemService } from './menuitem.service';
import { MenuitemController } from './menuitem.controller';
import { PrismaModule } from '../../prisma/prisma.module';
@Module({
  imports: [PrismaModule],
  controllers: [MenuitemController],
  providers: [MenuitemService],
  exports: [MenuitemService],
})
export class MenuitemModule {}
