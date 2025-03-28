import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationStatus } from '@prisma/client';

@Injectable()
export class ReservationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReservationDto: CreateReservationDto, userId: string) {
    return this.prisma.reservation.create({
      data: { ...createReservationDto, userId },
    });
  }

  async confirmReservation(id: string, orderId: string) {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id },
    });
    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }
    return this.prisma.reservation.update({
      where: { id },
      data: { status: ReservationStatus.CONFIRMED, orderId: orderId },
    });
  }

  async findAll() {
    return this.prisma.reservation.findMany({
      where: { isDeleted: false },
    });
  }

  async findOne(id: string) {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id },
    });
    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }
    return reservation;
  }

  async update(id: string, updateReservationDto: UpdateReservationDto) {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id },
    });
    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }
    return this.prisma.reservation.update({
      where: { id },
      data: updateReservationDto,
    });
  }

  async remove(id: string) {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id },
    });
    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }
    return this.prisma.reservation.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
