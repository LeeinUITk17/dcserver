import { PartialType } from '@nestjs/mapped-types';
import { CreateStatusHistoryDto } from './create-status-history.dto';

export class UpdateStatusHistoryDto extends PartialType(CreateStatusHistoryDto) {}
