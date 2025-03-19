import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
// import { UpdateOrderDto } from './dto/update-order.dto';
// import { UserService } from 'src/user/user.service';
import { CouponUsageService } from 'src/coupon/coupon-usage/coupon-usage.service';
import {
  OrderStatus,
  OrderType,
  PaymentMethod,
  PaymentStatus,
} from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { CreateCouponUsageDto } from 'src/coupon/coupon-usage/dto/create-coupon-usage.dto';
import { plainToInstance } from 'class-transformer';
@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly couponUsageService: CouponUsageService,
  ) {}

  async createOrder(data: CreateOrderDto) {
    return this.prisma.$transaction(async (prisma) => {
      const {
        userId,
        tableId,
        orderType,
        totalAmount,
        shippingFee,
        taxAmount,
        couponId,
        earnedPoint,
        status,
        orderDate,
        orderItems,
        paymentMethod,
        trackingCode,
      } = data;

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

      // Tạo đơn hàng
      const order = await prisma.order.create({
        data: {
          userId,
          tableId,
          orderType,
          orderDate: new Date(orderDate),
          totalAmount,
          shippingFee,
          taxAmount,
          couponId,
          earnedPoint,
          status: status || OrderStatus.PENDING,
          orderItems: {
            create: orderItems.map((item) => ({
              menuItemId: item.menuItemId,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
        include: { orderItems: true },
      });

      // Nếu là đơn hàng giao hàng, tạo bản ghi Delivery
      let delivery = null;
      if (orderType === OrderType.DELIVERY) {
        delivery = await prisma.delivery.create({
          data: {
            orderId: order.id,
            status: 'PENDING',
            carrier: 'DCDelivery', // Default carrier
            trackingCode: trackingCode || uuidv4(),
          },
        });
      }

      // Tạo thanh toán
      const payment = await prisma.payment.create({
        data: {
          orderId: order.id,
          amount: totalAmount + shippingFee + taxAmount,
          method: paymentMethod as PaymentMethod,
          status: PaymentStatus.PENDING,
        },
      });

      return { order, delivery, payment };
    });
  }
  async findAll() {
    return this.prisma.order.findMany();
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  // async update(id: string, updateOrderDto: UpdateOrderDto) {
  //   const order = await this.prisma.order.findUnique({
  //     where: { id },
  //   });
  //   if (!order) {
  //     throw new NotFoundException(`Order with ID ${id} not found`);
  //   }
  //   return this.prisma.order.update({
  //     where: { id },
  //     data: updateOrderDto,
  //   });
  // }

  async remove(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return this.prisma.order.update({
      where: { id },
      data: { status: OrderStatus.CANCELLED, isDeleted: true },
    });
  }
}
