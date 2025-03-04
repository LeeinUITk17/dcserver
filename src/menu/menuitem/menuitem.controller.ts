import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenuitemService } from './menuitem.service';
import { CreateMenuitemDto } from './dto/create-menuitem.dto';
import { UpdateMenuitemDto } from './dto/update-menuitem.dto';

@Controller('menuitem')
export class MenuitemController {
  constructor(private readonly menuitemService: MenuitemService) {}

  @Post()
  create(@Body() createMenuitemDto: CreateMenuitemDto) {
    return this.menuitemService.create(createMenuitemDto);
  }

  @Get()
  findAll() {
    return this.menuitemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuitemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuitemDto: UpdateMenuitemDto) {
    return this.menuitemService.update(+id, updateMenuitemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuitemService.remove(+id);
  }
}
