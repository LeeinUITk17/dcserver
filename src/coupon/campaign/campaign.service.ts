import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { Prisma } from '@prisma/client';
@Injectable()
export class CampaignService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCampaignDto: CreateCampaignDto) {
    return this.prisma.campaign.create({
      data: createCampaignDto,
    });
  }

  async findAll() {
    return this.prisma.campaign.findMany({ include: { couponPools: true } });
  }

  async findOne(id: string) {
    return this.prisma.campaign.findUnique({
      where: { id },
      include: { couponPools: true },
    });
  }

  async update(id: string, updateCampaignDto: UpdateCampaignDto) {
    return this.prisma.campaign.update({
      where: { id },
      data: updateCampaignDto,
    });
  }

  async remove(id: string) {
    return this.prisma.campaign.update({
      where: { id },
      data: { isDeleted: true },
    });
  }

  async bulkCreate(campaigns: Prisma.CampaignCreateManyInput[]) {
    return this.prisma.campaign.createMany({
      data: campaigns,
      skipDuplicates: true,
    });
  }
}
