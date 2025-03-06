import { Injectable } from '@nestjs/common';
import { CreateStatusHistoryDto } from './dto/create-status-history.dto';
import { UpdateStatusHistoryDto } from './dto/update-status-history.dto';

@Injectable()
export class StatusHistoryService {
  create(createStatusHistoryDto: CreateStatusHistoryDto) {
    return 'This action adds a new statusHistory';
  }

  findAll() {
    return `This action returns all statusHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} statusHistory`;
  }

  update(id: number, updateStatusHistoryDto: UpdateStatusHistoryDto) {
    return `This action updates a #${id} statusHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} statusHistory`;
  }
}
