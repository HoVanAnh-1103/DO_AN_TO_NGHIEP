import { SetMetadata, applyDecorators } from '@nestjs/common';
import { Role } from 'src/modules/auth/guards/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) =>
  applyDecorators(SetMetadata(ROLES_KEY, roles));
