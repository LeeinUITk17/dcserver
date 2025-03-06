import { Injectable } from '@nestjs/common';
import { CreateOvertimeRequestDto } from './dto/create-overtime-request.dto';
import { UpdateOvertimeRequestDto } from './dto/update-overtime-request.dto';

@Injectable()
export class OvertimeRequestService {
  create(createOvertimeRequestDto: CreateOvertimeRequestDto) {
    return 'This action adds a new overtimeRequest';
  }

  findAll() {
    return `This action returns all overtimeRequest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} overtimeRequest`;
  }

  update(id: number, updateOvertimeRequestDto: UpdateOvertimeRequestDto) {
    return `This action updates a #${id} overtimeRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} overtimeRequest`;
  }
}
