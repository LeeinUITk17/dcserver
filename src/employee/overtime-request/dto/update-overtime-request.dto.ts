import { PartialType } from '@nestjs/mapped-types';
import { CreateOvertimeRequestDto } from './create-overtime-request.dto';

export class UpdateOvertimeRequestDto extends PartialType(CreateOvertimeRequestDto) {}
