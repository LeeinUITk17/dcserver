import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { CouponUsageModule } from 'src/coupon/coupon-usage/coupon-usage.module';
import { ReservationModule } from '../reservation/reservation.module';
import { CouponModule } from 'src/coupon/coupon/coupon.module';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [
    PrismaModule,
    CouponUsageModule,
    ReservationModule,
    CouponModule,
    UserModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
