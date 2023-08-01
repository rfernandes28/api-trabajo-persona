import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

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
