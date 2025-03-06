import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OvertimeRequestService } from './overtime-request.service';
import { CreateOvertimeRequestDto } from './dto/create-overtime-request.dto';
import { UpdateOvertimeRequestDto } from './dto/update-overtime-request.dto';

@Controller('overtime-request')
export class OvertimeRequestController {
  constructor(private readonly overtimeRequestService: OvertimeRequestService) {}

  @Post()
  create(@Body() createOvertimeRequestDto: CreateOvertimeRequestDto) {
    return this.overtimeRequestService.create(createOvertimeRequestDto);
  }

  @Get()
  findAll() {
    return this.overtimeRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.overtimeRequestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOvertimeRequestDto: UpdateOvertimeRequestDto) {
    return this.overtimeRequestService.update(+id, updateOvertimeRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.overtimeRequestService.remove(+id);
  }
}
