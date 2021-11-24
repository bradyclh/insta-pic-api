import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_TYPE } from '../../enums/RoleType';
import UserRepository from '../../repositories/user.repository';
import { User } from '../../entities/user.entity';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector, private userRepository: UserRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<ROLE_TYPE[]>('roles', context.getHandler());
    const rolesValidator = this.reflector.get<(user: User) => boolean>(
      'rolesValidator',
      context.getHandler(),
    );
    if (!roles.length && !rolesValidator) return true;

    const request = context.switchToHttp().getRequest();
    const {
      user: { username },
    } = request;

    const foundUser = await this.userRepository.findOne({ username });
    request.user = foundUser;

    return roles
      ? foundUser.roles?.some(({ role }) => roles.includes(role))
      : rolesValidator(foundUser);
  }
}

export default RoleGuard;
