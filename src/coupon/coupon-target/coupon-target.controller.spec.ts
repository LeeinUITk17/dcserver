import { Test, TestingModule } from '@nestjs/testing';
import { CouponTargetController } from './coupon-target.controller';
import { CouponTargetService } from './coupon-target.service';

describe('CouponTargetController', () => {
  let controller: CouponTargetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CouponTargetController],
      providers: [CouponTargetService],
    }).compile();

    controller = module.get<CouponTargetController>(CouponTargetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
