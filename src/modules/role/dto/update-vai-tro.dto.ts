import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-vai-tro.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
