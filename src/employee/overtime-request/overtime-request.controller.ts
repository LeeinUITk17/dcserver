import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OvertimeRequestService } from './overtime-request.service';
import { CreateOvertimeRequestDto } from './dto/create-overtime-request.dto';
import { UpdateOvertimeRequestDto } from './dto/update-overtime-request.dto';
import { StaffGuard } from './../../auth/staff.gaurd';
import { AuthGuard } from '@nestjs/passport';
import { OvertimeStatus } from '@prisma/client';
import { AdminGuard } from 'src/auth/admin.gaurd';
@Controller('overtime-request')
export class OvertimeRequestController {
  constructor(
    private readonly overtimeRequestService: OvertimeRequestService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), StaffGuard)
  create(
    @Body() createOvertimeRequestDto: CreateOvertimeRequestDto,
    @Req() req,
  ) {
    return this.overtimeRequestService.create(
      createOvertimeRequestDto,
      req.user.id,
    );
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), StaffGuard)
  findAll() {
    return this.overtimeRequestService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), StaffGuard)
  findOne(@Param('id') id: string) {
    return this.overtimeRequestService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), StaffGuard)
  update(
    @Param('id') id: string,
    @Body() updateOvertimeRequestDto: UpdateOvertimeRequestDto,
  ) {
    return this.overtimeRequestService.update(id, updateOvertimeRequestDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), StaffGuard)
  remove(@Param('id') id: string) {
    return this.overtimeRequestService.remove(id);
  }
  @Patch('approve/:id/:status')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  approveOvertimeRequest(
    @Param('id') id: string,
    @Param('status') status: OvertimeStatus,
  ) {
    return this.overtimeRequestService.resolveRequest(id, status);
  }
}
