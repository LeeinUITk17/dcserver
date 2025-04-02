import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { LeaveRequestService } from './leave-request.service';
import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { UpdateLeaveRequestDto } from './dto/update-leave-request.dto';
import { StaffGuard } from './../../auth/staff.gaurd';
import { AuthGuard } from '@nestjs/passport';
import { LeaveStatus } from '@prisma/client';
import { AdminGuard } from 'src/auth/admin.gaurd';
@Controller('leave-request')
export class LeaveRequestController {
  constructor(private readonly leaveRequestService: LeaveRequestService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), StaffGuard)
  create(@Body() createLeaveRequestDto: CreateLeaveRequestDto) {
    return this.leaveRequestService.create(createLeaveRequestDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), StaffGuard)
  findAll() {
    return this.leaveRequestService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), StaffGuard)
  findOne(@Param('id') id: string) {
    return this.leaveRequestService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), StaffGuard)
  update(
    @Param('id') id: string,
    @Body() updateLeaveRequestDto: UpdateLeaveRequestDto,
  ) {
    return this.leaveRequestService.update(id, updateLeaveRequestDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), StaffGuard)
  remove(@Param('id') id: string) {
    return this.leaveRequestService.remove(id);
  }
  @Patch('approve/:id/:status')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  approveLeaveRequest(
    @Param('id') id: string,
    @Param('status') status: LeaveStatus,
  ) {
    return this.leaveRequestService.resolveRequest(id, status);
  }
}
