import { ApiResponseProperty } from '@nestjs/swagger';
// eslint-disable-next-line prettier/prettier
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsObject,
  IsEnum,
} from 'class-validator';
import { USER_STATUS } from '../../../enums/UserStatus';

class UserBaseResponse {
  @ApiResponseProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiResponseProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiResponseProperty()
  @IsNotEmpty()
  @IsEnum(USER_STATUS)
  status: USER_STATUS;
}

export class JWTUserResponse {
  @ApiResponseProperty()
  @IsString()
  token: string;

  @ApiResponseProperty()
  @IsObject()
  user: UserBaseResponse;
}
