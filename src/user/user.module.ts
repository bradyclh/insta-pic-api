import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from '../repositories/user.repository';
import { Role } from '../entities/role.entity';
import env from '../config/env-config';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, Role]),
    JwtModule.register({
      secret: env.jwt.secretKey,
      signOptions: { expiresIn: env.jwt.expiresIn },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}
