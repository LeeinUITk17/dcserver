import { Injectable } from '@nestjs/common';
import { CreateCouponTargetDto } from './dto/create-coupon-target.dto';
import { UpdateCouponTargetDto } from './dto/update-coupon-target.dto';

@Injectable()
export class CouponTargetService {
  create(createCouponTargetDto: CreateCouponTargetDto) {
    return 'This action adds a new couponTarget';
  }

  findAll() {
    return `This action returns all couponTarget`;
  }

  findOne(id: number) {
    return `This action returns a #${id} couponTarget`;
  }

  update(id: number, updateCouponTargetDto: UpdateCouponTargetDto) {
    return `This action updates a #${id} couponTarget`;
  }

  remove(id: number) {
    return `This action removes a #${id} couponTarget`;
  }
}
