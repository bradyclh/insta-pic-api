import { Controller, Get, Post, Query, Body, UseGuards } from '@nestjs/common';
// eslint-disable-next-line prettier/prettier
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { UserService } from './user.service';
import { UsersResponse } from './dto/response/users.response';
import { FindDto } from './dto/user.dto';
import { SignupDto } from './dto/signup.dto';
import { JWTUserResponse } from './dto/response/jwtUser.response';
// import RoleGuard from '../utils/decorator/RoleGuard.decorator';
import AuthGuard from './guard/auth.guard';
// import { ROLE_TYPE } from '../enums/RoleType';
import User from '../utils/decorator/GetUser.decorator';
import { UserProfileResponse } from './dto/response/userProfile.response';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @RoleGuard(ROLE_TYPE.ADMIN)
  @Get('find')
  @ApiOperation({ summary: 'get all user list by query string' })
  @ApiResponse({ type: UsersResponse })
  find(@Query() data: FindDto) {
    return this.userService.find(data);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: 'Get user profile' })
  getUserProfile(@User('id') authId: number): Promise<UserProfileResponse> {
    return this.userService.getUserProfile(authId);
  }

  @Post('signup')
  @ApiOperation({ summary: 'sign up with username' })
  @ApiResponse({ type: JWTUserResponse })
  signup(@Body() data: SignupDto) {
    return this.userService.signup(data);
  }

  @Post('login')
  @ApiOperation({ summary: 'login with username' })
  @ApiResponse({ type: JWTUserResponse })
  login(@Body() data: SignupDto) {
    return this.userService.login(data);
  }
}
