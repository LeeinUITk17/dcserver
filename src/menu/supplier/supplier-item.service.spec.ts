import { Test, TestingModule } from '@nestjs/testing';
import { SupplierItemService } from './supplier-item.service';

describe('SupplierItemService', () => {
  let service: SupplierItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupplierItemService],
    }).compile();

    service = module.get<SupplierItemService>(SupplierItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
