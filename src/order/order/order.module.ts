import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { CouponUsageModule } from 'src/coupon/coupon-usage/coupon-usage.module';
@Module({
  imports: [PrismaModule, CouponUsageModule],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
