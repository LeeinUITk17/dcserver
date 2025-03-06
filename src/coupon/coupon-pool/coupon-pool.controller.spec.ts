import { Test, TestingModule } from '@nestjs/testing';
import { CouponPoolController } from './coupon-pool.controller';
import { CouponPoolService } from './coupon-pool.service';

describe('CouponPoolController', () => {
  let controller: CouponPoolController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CouponPoolController],
      providers: [CouponPoolService],
    }).compile();

    controller = module.get<CouponPoolController>(CouponPoolController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
