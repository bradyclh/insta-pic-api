import { ApiResponseProperty } from '@nestjs/swagger';
// eslint-disable-next-line prettier/prettier
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsObject,
  IsDate,
  IsEnum,
} from 'class-validator';
import { USER_STATUS } from '../../../enums/UserStatus';

class UserResponse {
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

  @ApiResponseProperty()
  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @ApiResponseProperty()
  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;

  @ApiResponseProperty()
  @IsNotEmpty()
  @IsDate()
  deletedAt?: Date;
}

export class UsersResponse {
  @ApiResponseProperty()
  @IsObject()
  users: UserResponse[];
}
