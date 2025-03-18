import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MenuitemService } from './menuitem.service';
import { CreateMenuitemDto } from './dto/create-menuitem.dto';
import { UpdateMenuitemDto } from './dto/update-menuitem.dto';
import { AuthGuard } from '@nestjs/passport';
import { StaffGuard } from './../../auth/staff.gaurd';
@Controller('menu-items')
@UseGuards(AuthGuard('jwt'), StaffGuard)
export class MenuitemController {
  constructor(private readonly menuitemService: MenuitemService) {}

  @Post()
  async create(@Body() createMenuItemDto: CreateMenuitemDto) {
    return this.menuitemService.create(createMenuItemDto);
  }

  @Get()
  async findAll() {
    return this.menuitemService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.menuitemService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMenuItemDto: UpdateMenuitemDto,
  ) {
    return this.menuitemService.update(id, updateMenuItemDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.menuitemService.remove(id);
  }
}
