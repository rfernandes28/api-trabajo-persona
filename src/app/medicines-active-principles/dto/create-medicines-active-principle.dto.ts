import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsPositive, Min } from 'class-validator';

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
}
