import { Test, TestingModule } from '@nestjs/testing';
import { MenuitemController } from './menuitem.controller';
import { MenuitemService } from './menuitem.service';

describe('MenuitemController', () => {
  let controller: MenuitemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuitemController],
      providers: [MenuitemService],
    }).compile();

    controller = module.get<MenuitemController>(MenuitemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
