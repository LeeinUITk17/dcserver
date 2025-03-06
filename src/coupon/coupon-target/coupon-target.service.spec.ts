import { Test, TestingModule } from '@nestjs/testing';
import { CouponTargetService } from './coupon-target.service';

describe('CouponTargetService', () => {
  let service: CouponTargetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CouponTargetService],
    }).compile();

    service = module.get<CouponTargetService>(CouponTargetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
