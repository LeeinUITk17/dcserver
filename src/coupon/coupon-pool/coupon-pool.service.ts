import { Injectable } from '@nestjs/common';
import { CreateCouponPoolDto } from './dto/create-coupon-pool.dto';
import { UpdateCouponPoolDto } from './dto/update-coupon-pool.dto';

@Injectable()
export class CouponPoolService {
  create(createCouponPoolDto: CreateCouponPoolDto) {
    return 'This action adds a new couponPool';
  }

  findAll() {
    return `This action returns all couponPool`;
  }

  findOne(id: number) {
    return `This action returns a #${id} couponPool`;
  }

  update(id: number, updateCouponPoolDto: UpdateCouponPoolDto) {
    return `This action updates a #${id} couponPool`;
  }

  remove(id: number) {
    return `This action removes a #${id} couponPool`;
  }
}
