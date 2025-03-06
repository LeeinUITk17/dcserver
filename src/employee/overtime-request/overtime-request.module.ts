import { Module } from '@nestjs/common';
import { OvertimeRequestService } from './overtime-request.service';
import { OvertimeRequestController } from './overtime-request.controller';

@Module({
  controllers: [OvertimeRequestController],
  providers: [OvertimeRequestService],
})
export class OvertimeRequestModule {}
