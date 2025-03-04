import { Test, TestingModule } from '@nestjs/testing';
import { SupplierItemController } from './supplier-item.controller';
import { SupplierItemService } from './supplier-item.service';

describe('SupplierItemController', () => {
  let controller: SupplierItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupplierItemController],
      providers: [SupplierItemService],
    }).compile();

    controller = module.get<SupplierItemController>(SupplierItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
