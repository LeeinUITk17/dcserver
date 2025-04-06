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
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { StaffGuard } from './../../auth/staff.gaurd';
import { AuthGuard } from '@nestjs/passport';
@Controller('attendance')
@UseGuards(AuthGuard('jwt'), StaffGuard)
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  create(@Body() createAttendanceDto: CreateAttendanceDto, @Req() req) {
    return this.attendanceService.create(createAttendanceDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.attendanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attendanceService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAttendanceDto: UpdateAttendanceDto,
  ) {
    return this.attendanceService.update(id, updateAttendanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attendanceService.remove(id);
  }
  @Post('bulk/:employeeId')
  bulkCreate(
    @Param('employeeId') employeeId: string,
    @Body() attendanceRecords: CreateAttendanceDto[],
  ) {
    return this.attendanceService.bulkCreateAttendanceRecords(
      employeeId,
      attendanceRecords,
    );
  }
}
