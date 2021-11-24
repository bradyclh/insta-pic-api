import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from '../repositories/user.repository';
import { Role } from '../entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, Role])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
