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

export class CreateMedicinesActivePrincipleDto {
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  commercialPresentationId: number;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  activePrincipleId: number;

  @IsNotEmpty()
  @ApiProperty()
  concentration: string;
}

export class FilterMedicinesActiveDto {
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
