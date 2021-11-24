import { Controller, Get, Post, Query, Body } from '@nestjs/common';
// eslint-disable-next-line prettier/prettier
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

import { UserService } from './user.service';
import { UsersResponse } from './dto/response/users.response';
import { FindDto } from './dto/user.dto';
import { SignupDto } from './dto/signup.dto';

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

  @Post('signup')
  @ApiOperation({ summary: 'sign up with username' })
  @ApiResponse({ type: UsersResponse })
  signup(@Body() data: SignupDto) {
    return this.userService.signup(data);
  }
}
