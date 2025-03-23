import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { plainToInstance } from 'class-transformer';
import { CreateCouponUsageDto } from 'src/coupon/coupon-usage/dto/create-coupon-usage.dto';
import { CouponUsageService } from 'src/coupon/coupon-usage/coupon-usage.service';
import { UserService } from 'src/user/user.service';
import { Decimal } from '@prisma/client/runtime/library';
import {
  DiscountType,
  OrderStatus,
  OrderType,
  PaymentStatus,
  ReservationStatus,
} from '@prisma/client';
@Injectable()
export class PaymentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly couponUsageService: CouponUsageService,
    private readonly userService: UserService,
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    // 1️⃣ Kiểm tra đơn hàng có tồn tại không
    const order = await this.prisma.order.findUnique({
      where: { id: createPaymentDto.orderId },
      include: { coupon: true },
    });

    if (!order) {
      throw new NotFoundException(
        `Order with ID ${createPaymentDto.orderId} not found`,
      );
    }

    let discountAmount = new Decimal(0);
    if (order.coupon) {
      const { discountType, discountValue, maxDiscountValue } = order.coupon;
      const maxDiscount = maxDiscountValue
        ? new Decimal(maxDiscountValue)
        : new Decimal(Infinity);

      if (discountType === DiscountType.PERCENTAGE) {
        discountAmount = order.totalAmount
          .mul(new Decimal(discountValue))
          .div(new Decimal(100));
      } else if (discountType === DiscountType.FIXED_AMOUNT) {
        discountAmount = new Decimal(discountValue);
      }

      discountAmount = Decimal.min(discountAmount, maxDiscount); // Giới hạn mức giảm tối đa
    }

    // Tính tổng tiền sau giảm giá
    const finalAmount = Decimal.max(
      order.totalAmount.sub(discountAmount),
      new Decimal(0),
    ); // Không để số âm

    // 3️⃣ Xử lý coupon nếu có
    if (order.couponId && order.userId) {
      await this.handleCouponUsage(order.couponId, order.userId);
    }

    // 4️⃣ Cập nhật hạng thành viên nếu có
    if (order.userId) {
      await this.updateUserTier(order.userId, order.earnedPoint);
    }

    // 5️⃣ Kiểm tra trạng thái thanh toán
    if (createPaymentDto.status !== PaymentStatus.COMPLETED) {
      throw new BadRequestException('Payment must be COMPLETED to proceed');
    }

    // 6️⃣ Tạo thanh toán
    const payment = await this.prisma.payment.create({
      data: {
        ...createPaymentDto,
        amount: finalAmount, // Cập nhật số tiền sau khi áp dụng giảm giá
        orderId: order.id,
      },
    });

    // 7️⃣ Cập nhật trạng thái đơn hàng
    const newOrderStatus =
      order.orderType === OrderType.DELIVERY
        ? OrderStatus.DELIVERED
        : OrderStatus.SERVED;

    await this.prisma.order.update({
      where: { id: order.id },
      data: { status: newOrderStatus },
    });
    if (order.tableId) {
      await this.prisma.table.update({
        where: { id: order.tableId },
        data: { status: 'AVAILABLE' },
      });
    }
    if (order.reservationId) {
      await this.prisma.reservation.update({
        where: { id: order.reservationId },
        data: { status: ReservationStatus.COMPLETED },
      });
    }
    const delivery = await this.prisma.delivery.findFirst({
      where: { orderId: order.id },
    });
    if (delivery) {
      await this.prisma.delivery.update({
        where: { id: delivery.id },
        data: { status: 'DELIVERED' },
      });
    }

    return payment;
  }

  // ✅ Hàm hỗ trợ xử lý coupon
  private async handleCouponUsage(couponId: string, userId: string) {
    try {
      const createCouponUsageDto = plainToInstance(CreateCouponUsageDto, {
        couponId,
        userId,
      });
      await this.couponUsageService.create(createCouponUsageDto);
    } catch (error) {
      console.error('Error creating coupon usage:', error.message);
      throw new InternalServerErrorException('Failed to create coupon usage');
    }
  }

  // ✅ Hàm hỗ trợ cập nhật hạng thành viên
  private async updateUserTier(userId: string, earnedPoint: number) {
    try {
      await this.userService.updateUserTier(userId, earnedPoint);
    } catch (error) {
      console.error('Error updating user tier:', error.message);
    }
  }

  async findAll() {
    return this.prisma.payment.findMany();
  }

  async findOne(id: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
    });
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return payment;
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
    });
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return this.prisma.payment.update({
      where: { id },
      data: updatePaymentDto,
    });
  }
}
