import { ApiResponseProperty } from '@nestjs/swagger';
// eslint-disable-next-line prettier/prettier
import {
  IsNotEmpty,
  IsBoolean,
  IsNumber,
  IsString,
  IsObject,
  IsDate,
} from 'class-validator';

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
  @IsBoolean()
  status: boolean;

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
  deletedAt: Date;
}

export class UsersResponse {
  @ApiResponseProperty()
  @IsObject()
  users: UserResponse[];
}
