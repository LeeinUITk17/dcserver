import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { CouponUsageModule } from 'src/coupon/coupon-usage/coupon-usage.module';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [PrismaModule, CouponUsageModule, UserModule],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
