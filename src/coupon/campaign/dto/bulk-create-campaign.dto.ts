import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCampaignDto } from './create-campaign.dto';

export class BulkCreateCampaignsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCampaignDto)
  campaigns: CreateCampaignDto[];
}
