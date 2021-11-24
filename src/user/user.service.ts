import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { USER_STATUS } from '../enums/UserStatus';
import { UserRepository } from '../repositories/user.repository';
import { SignupDto } from './dto/signup.dto';
import { FindDto } from './dto/user.dto';
import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';
import { ROLE_TYPE } from '../enums/RoleType';
import { getHash } from '../utils/cryptoHelper';
import env from '../config/env-config';

const { passwordHashSalt } = env.key;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly userRepository: UserRepository,
  ) {}

  async find({ limit, pageIndex, orderColumn, orderBy }: FindDto) {
    const users = await this.userRepository.find({
      order: {
        [orderColumn]: orderBy,
      },
      skip: (pageIndex - 1) * limit,
      take: limit,
    });

    return users;
  }

  async signup({ username, password }: SignupDto): Promise<User> {
    try {
      // get default role - USER
      const role = await this.roleRepository.findOne({ role: ROLE_TYPE.USER });

      // encrypt password with salt
      const encryptedPassword = getHash({
        data: password,
        salt: passwordHashSalt,
      });

      const user = await this.userRepository.save({
        username,
        password: encryptedPassword,
        status: USER_STATUS.REGISTERED,
        roles: [role],
      });

      return user;
    } catch ({ errno }) {
      throw errno === 1062
        ? new ConflictException('This account already exists')
        : new InternalServerErrorException('Failed to sign up');
    }
  }
}
