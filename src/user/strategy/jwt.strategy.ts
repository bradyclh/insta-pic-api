import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import JwtPayload from '../interface/jwt-payload.interface';
import env from '../../config/env-config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.jwt.secretKey,
    });
  }

  validate(payload: JwtPayload): JwtPayload {
    return payload;
  }
}

export default JwtStrategy;
