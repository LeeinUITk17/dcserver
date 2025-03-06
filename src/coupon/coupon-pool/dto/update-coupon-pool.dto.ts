import { PartialType } from '@nestjs/mapped-types';
import { CreateCouponPoolDto } from './create-coupon-pool.dto';

export class UpdateCouponPoolDto extends PartialType(CreateCouponPoolDto) {}
