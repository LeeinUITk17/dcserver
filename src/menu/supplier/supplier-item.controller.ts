import {
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SupplierItemService } from './supplier-item.service';
import { CreateSupplierItemDto } from './dto/create-supplier-item.dto';
import { UpdateSupplierItemDto } from './dto/update-supplier-item.dto';
import { BulkCreateSuppliersDto } from './dto/bulk-create-suppliers.dto';
import { AuthGuard } from '@nestjs/passport';
import { StaffGuard } from './../../auth/staff.gaurd';
@Controller('supplier')
@UseGuards(AuthGuard('jwt'), StaffGuard)
export class SupplierItemController {
  constructor(private readonly supplierItemService: SupplierItemService) {}

  @Post()
  create(@Body() createSupplierItemDto: CreateSupplierItemDto) {
    return this.supplierItemService.create(createSupplierItemDto);
  }

  @Get()
  findAll() {
    return this.supplierItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supplierItemService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSupplierItemDto: UpdateSupplierItemDto,
  ) {
    return this.supplierItemService.update(id, updateSupplierItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supplierItemService.remove(id);
  }
  @Post('bulk')
  async bulkCreate(@Body() dto: BulkCreateSuppliersDto) {
    return this.supplierItemService.bulkCreate(dto.suppliers);
  }
}
