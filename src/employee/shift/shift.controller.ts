import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShiftService } from './shift.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from './../../auth/admin.gaurd';
import { StaffGuard } from './../../auth/staff.gaurd';
@Controller('shift')
export class ShiftController {
  constructor(private readonly shiftService: ShiftService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  create(@Body() createShiftTemplateDto: CreateShiftDto) {
    return this.shiftService.create(createShiftTemplateDto);
  }
  @Post('bulk')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  bulkCreate(@Body() shiftTemplates: CreateShiftDto[]) {
    return this.shiftService.bulkCreate(shiftTemplates);
  }
  @Get()
  @UseGuards(AuthGuard('jwt'), StaffGuard)
  findAll() {
    return this.shiftService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), StaffGuard)
  findOne(@Param('id') id: string) {
    return this.shiftService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  update(
    @Param('id') id: string,
    @Body() updateShiftTemplateDto: UpdateShiftDto,
  ) {
    return this.shiftService.update(id, updateShiftTemplateDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  remove(@Param('id') id: string) {
    return this.shiftService.remove(id);
  }
}
