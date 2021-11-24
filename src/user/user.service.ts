import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { USER_STATUS } from '../enums/UserStatus';
import { UserRepository } from '../repositories/user.repository';
import { SignupDto } from './dto/signup.dto';
import { FindDto } from './dto/user.dto';
import { Role } from '../entities/role.entity';
import { ROLE_TYPE } from '../enums/RoleType';
import { getHash } from '../utils/cryptoHelper';
import env from '../config/env-config';
import { JWTUserResponse } from './dto/response/jwtUser.response';
import { UserProfileResponse } from './dto/response/userProfile.response';

const { passwordHashSalt } = env.key;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
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

  async signup({ username, password }: SignupDto): Promise<JWTUserResponse> {
    try {
      // get default role - USER
      const role = await this.roleRepository.findOne({ role: ROLE_TYPE.USER });

      // encrypt password with salt
      const encryptedPassword = getHash({
        data: password,
        salt: passwordHashSalt,
      });

      const newUser = await this.userRepository.save({
        username,
        password: encryptedPassword,
        status: USER_STATUS.REGISTERED,
        roles: [role],
      });

      const token = this.jwtService.sign({ id: newUser.id, username: newUser.username });

      return {
        token,
        user: {
          id: newUser.id,
          username: newUser.username,
          status: newUser.status,
        },
      };
    } catch ({ errno }) {
      throw errno === 1062
        ? new ConflictException('This account already exists')
        : new InternalServerErrorException('Failed to sign up');
    }
  }

  async login({ username, password }: SignupDto): Promise<JWTUserResponse> {
    try {
      const user = await this.userRepository.findOne({ username });
      if (
        !user ||
        getHash({
          data: password,
          salt: passwordHashSalt,
        }) !== user?.password
      )
        throw new UnauthorizedException('The Account or password is not correct.');

      const token = this.jwtService.sign({
        id: user.id,
        username: user.username,
      });

      return {
        token,
        user: {
          id: user.id,
          username: user.username,
          status: user.status,
        },
      };
    } catch (error) {
      if (error?.status) throw error;
      throw new InternalServerErrorException('Failed to login');
    }
  }

  getUserProfile(id: number): Promise<UserProfileResponse> {
    return this.userRepository.findOne(id);
  }
}
