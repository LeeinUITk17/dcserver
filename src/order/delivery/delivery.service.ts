import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@Injectable()
export class DeliveryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDeliveryDto: CreateDeliveryDto) {
    return this.prisma.delivery.create({
      data: createDeliveryDto,
    });
  }

  async findAll() {
    return this.prisma.delivery.findMany();
  }

  async findOne(id: string) {
    const delivery = await this.prisma.delivery.findUnique({
      where: { id },
    });
    if (!delivery) {
      throw new NotFoundException(`Delivery with ID ${id} not found`);
    }
    return delivery;
  }
  async findbyTrackingNumber(trackingNumber: string) {
    const delivery = await this.prisma.delivery.findFirst({
      where: { trackingCode: trackingNumber },
    });
    if (!delivery) {
      throw new NotFoundException(
        `Delivery with Tracking Number ${trackingNumber} not found`,
      );
    }
    return delivery;
  }

  async update(id: string, updateDeliveryDto: UpdateDeliveryDto) {
    const delivery = await this.prisma.delivery.findUnique({
      where: { id },
    });
    if (!delivery) {
      throw new NotFoundException(`Delivery with ID ${id} not found`);
    }
    return this.prisma.delivery.update({
      where: { id },
      data: updateDeliveryDto,
    });
  }
}
