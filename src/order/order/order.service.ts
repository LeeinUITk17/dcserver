import {
  Injectable,
  // InternalServerErrorException,
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
  TableStatus,
  // PaymentMethod,
  // PaymentStatus,
} from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
// import { CreateCouponUsageDto } from 'src/coupon/coupon-usage/dto/create-coupon-usage.dto';
// import { plainToInstance } from 'class-transformer';
@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly couponUsageService: CouponUsageService,
  ) {}
  async createOrder(data: CreateOrderDto) {
    return this.prisma.$transaction(async (prisma) => {
      const { userId, tableId, orderType, shippingFee, couponId, orderItems } =
        data;

      // Tính tổng tiền đơn hàng
      const totalAmount = orderItems.reduce(
        (sum: number, item) => sum + Number(item.price) * item.quantity,
        0,
      );
      const taxAmount = parseFloat((totalAmount * 0.1).toFixed(2)); // Làm tròn 2 chữ số thập phân
      const earnedPoint = parseFloat((totalAmount * 0.01).toFixed(2));

      // 1️⃣ Tạo đơn hàng
      const order = await prisma.order.create({
        data: {
          userId,
          tableId,
          orderType,
          totalAmount,
          shippingFee,
          taxAmount,
          couponId,
          earnedPoint,
          status: OrderStatus.PROCESSING,
          orderItems: {
            create: orderItems.map((item) => ({
              menuItemId: item.menuItemId,
              quantity: item.quantity,
              price: Number(item.price),
            })),
          },
        },
        include: {
          orderItems: true,
        },
      });

      // 2️⃣ Nếu là đơn "DINE_IN", cập nhật trạng thái bàn
      if (orderType === OrderType.DINE_IN && tableId) {
        await prisma.table.update({
          where: { id: tableId },
          data: { status: TableStatus.OCCUPIED },
        });
      }

      // 3️⃣ Nếu là đơn "DELIVERY", tạo bản ghi giao hàng
      const delivery =
        orderType === OrderType.DELIVERY
          ? await prisma.delivery.create({
              data: {
                orderId: order.id,
                status: 'PENDING',
                carrier: 'DCDelivery', // Carrier mặc định
                trackingCode: uuidv4(),
              },
            })
          : null;

      return { order, delivery };
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
