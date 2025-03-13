import { Module } from '@nestjs/common';
import { OvertimeRequestService } from './overtime-request.service';
import { OvertimeRequestController } from './overtime-request.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
@Module({
  imports: [PrismaModule],
  controllers: [OvertimeRequestController],
  providers: [OvertimeRequestService],
})
export class OvertimeRequestModule {}
