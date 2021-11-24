import { Injectable } from '@nestjs/common';
import { AuthGuard as AuthGuardBase } from '@nestjs/passport';

@Injectable()
export class AuthGuard extends AuthGuardBase('jwt') {}

export default AuthGuard;
