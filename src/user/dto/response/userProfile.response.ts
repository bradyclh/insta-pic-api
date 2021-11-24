import { ApiResponseProperty } from '@nestjs/swagger';
// eslint-disable-next-line prettier/prettier
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsEnum,
  IsDate,
} from 'class-validator';
import { USER_STATUS } from '../../../enums/UserStatus';

export class UserProfileResponse {
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
