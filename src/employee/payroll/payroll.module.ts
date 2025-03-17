import { Module } from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { PayrollController } from './payroll.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PayrollController],
  providers: [PayrollService],
  exports: [PayrollService], // 🔥 Thêm dòng này để PayrollService có thể được inject ở nơi khác
})
export class PayrollModule {}
