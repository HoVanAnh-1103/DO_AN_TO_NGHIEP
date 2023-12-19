import { PartialType } from '@nestjs/mapped-types';
import { CreateLessionStatusDto } from './create-lession-status.dto';

export class UpdateLessionStatusDto extends PartialType(CreateLessionStatusDto) {}
