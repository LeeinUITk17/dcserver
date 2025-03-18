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
import { CampaignService } from './campaign.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { BulkCreateCampaignsDto } from './dto/bulk-create-campaign.dto';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from './../../auth/admin.gaurd';
import { StaffGuard } from './../../auth/staff.gaurd';
@Controller('campaign')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  create(@Body() createCampaignDto: CreateCampaignDto) {
    return this.campaignService.create(createCampaignDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), StaffGuard)
  findAll() {
    return this.campaignService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), StaffGuard)
  findOne(@Param('id') id: string) {
    return this.campaignService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  update(
    @Param('id') id: string,
    @Body() updateCampaignDto: UpdateCampaignDto,
  ) {
    return this.campaignService.update(id, updateCampaignDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  remove(@Param('id') id: string) {
    return this.campaignService.remove(id);
  }
  @Post('bulk')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async bulkCreate(@Body() dto: BulkCreateCampaignsDto) {
    return this.campaignService.bulkCreate(dto.campaigns);
  }
}
