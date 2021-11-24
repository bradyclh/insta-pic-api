import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ROLE_TYPE } from '../../enums/RoleType';
import { User } from '../../entities/user.entity';
import AuthGuard from '../../user/guard/auth.guard';
import RolesGuard from '../../user/guard/role.guard';

export const RoleGuard = (...roles: ROLE_TYPE[] | [(auth: User) => boolean]) =>
  applyDecorators(
    ApiBearerAuth('Authorization'),
    typeof roles[0] === 'function'
      ? SetMetadata('rolesValidator', roles[0])
      : SetMetadata('roles', roles),
    UseGuards(AuthGuard, RolesGuard),
  );

export default RoleGuard;
