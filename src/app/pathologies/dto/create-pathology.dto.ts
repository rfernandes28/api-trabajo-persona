import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreatePathologyDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly name: string;
}

export class FilterPathologyDto {
  @IsPositive()
  @IsOptional()
  @ApiProperty()
  readonly limit?: number;

  @Min(0)
  @IsOptional()
  @ApiProperty()
  readonly offset?: number;
}
