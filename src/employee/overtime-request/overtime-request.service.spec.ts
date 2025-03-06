import { Test, TestingModule } from '@nestjs/testing';
import { OvertimeRequestService } from './overtime-request.service';

describe('OvertimeRequestService', () => {
  let service: OvertimeRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OvertimeRequestService],
    }).compile();

    service = module.get<OvertimeRequestService>(OvertimeRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
