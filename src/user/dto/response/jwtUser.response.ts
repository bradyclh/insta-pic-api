import { ApiResponseProperty } from '@nestjs/swagger';
// eslint-disable-next-line prettier/prettier
import {
  IsNotEmpty,
  IsBoolean,
  IsNumber,
  IsString,
  IsObject,
} from 'class-validator';

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
  @IsBoolean()
  status: boolean;
}

export class JWTUserResponse {
  @ApiResponseProperty()
  @IsString()
  token: string;

  @ApiResponseProperty()
  @IsObject()
  user: UserBaseResponse;
}
