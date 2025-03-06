import { Module } from '@nestjs/common';
import { StatusHistoryService } from './status-history.service';
import { StatusHistoryController } from './status-history.controller';

@Module({
  controllers: [StatusHistoryController],
  providers: [StatusHistoryService],
})
export class StatusHistoryModule {}
