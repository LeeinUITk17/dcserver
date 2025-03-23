import { Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CouponStatus } from '@prisma/client';
@Injectable()
export class CouponExpirationMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}

  async use(req: any, res: any, next: () => void) {
    console.log('Checking expired campaigns...');

    const expiredCampaigns = await this.prisma.campaign.findMany({
      where: { endDate: { lt: new Date() } }, // Find expired campaigns
      select: { id: true },
    });

    if (expiredCampaigns.length > 0) {
      const campaignIds = expiredCampaigns.map((campaign) => campaign.id);

      // Find all CouponPools linked to these campaigns
      const couponPools = await this.prisma.couponPool.findMany({
        where: { campaignId: { in: campaignIds } },
        select: { id: true },
      });

      const poolIds = couponPools.map((pool) => pool.id);

      if (poolIds.length > 0) {
        // Update all Coupons in these CouponPools to status EXPIRED
        await this.prisma.coupon.updateMany({
          where: { poolId: { in: poolIds } },
          data: { status: CouponStatus.EXPIRED },
        });

        console.log(
          `Updated ${poolIds.length} coupon pools. All coupons set to EXPIRED.`,
        );
      }
    }

    next();
  }
}
