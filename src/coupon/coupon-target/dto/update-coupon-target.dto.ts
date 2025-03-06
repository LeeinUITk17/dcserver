import { PartialType } from '@nestjs/mapped-types';
import { CreateCouponTargetDto } from './create-coupon-target.dto';

export class UpdateCouponTargetDto extends PartialType(CreateCouponTargetDto) {}
