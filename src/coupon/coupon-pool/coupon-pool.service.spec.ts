import { Test, TestingModule } from '@nestjs/testing';
import { CouponPoolService } from './coupon-pool.service';

describe('CouponPoolService', () => {
  let service: CouponPoolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CouponPoolService],
    }).compile();

    service = module.get<CouponPoolService>(CouponPoolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
