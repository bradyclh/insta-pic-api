import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { FindDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

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
}
