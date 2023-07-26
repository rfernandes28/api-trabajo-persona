import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateMedicinesActivePrincipleDto {
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  medicineId: number;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  activePrincipleId: number;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  packageId: number;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  presentationId: number;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  stock: number;

  @IsNotEmpty()
  @ApiProperty()
  concentration: string;
}
