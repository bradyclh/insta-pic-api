import { Controller, Get, Query } from '@nestjs/common';
// eslint-disable-next-line prettier/prettier
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

import { UserService } from './user.service';
import { FindDto } from './dto/user.dto';
import { UsersResponse } from './dto/response/users.response';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/find')
  @ApiOperation({ summary: 'get all user list by query string' })
  @ApiResponse({ type: UsersResponse })
  find(@Query() data: FindDto) {
    return this.userService.find(data);
  }
}
