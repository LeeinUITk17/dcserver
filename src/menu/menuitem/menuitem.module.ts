import { Module } from '@nestjs/common';
import { MenuitemService } from './menuitem.service';
import { MenuitemController } from './menuitem.controller';

@Module({
  controllers: [MenuitemController],
  providers: [MenuitemService],
})
export class MenuitemModule {}
