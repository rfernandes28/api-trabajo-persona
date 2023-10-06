import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { order } from 'src/common/constants';

export class CreateActivePrincipleDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly name: string;
}

export class FilterActivePrinciplesDto {
  @IsPositive()
  @IsOptional()
  @ApiProperty()
  readonly limit?: number;

  @Min(0)
  @IsOptional()
  @ApiProperty()
  readonly offset?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ default: 'id' })
  readonly sortBy?: string;

  @IsOptional()
  @IsString()
  @IsEnum(order)
  @ApiProperty({ default: order.asc })
  readonly order?: order;

  @IsOptional()
  @IsString()
  @ApiProperty()
  public search?: string;
}
