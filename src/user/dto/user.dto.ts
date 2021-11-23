// eslint-disable-next-line prettier/prettier
import {
  IsNotEmpty,
  IsInt,
  IsString,
  IsPositive,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class FindDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(50)
  @Type(() => Number)
  limit: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  pageIndex: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  orderColumn: string;

  @ApiProperty({ enum: ['ASC', 'DESC'] })
  @IsNotEmpty()
  @IsString()
  orderBy: string;
}
