import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateCommercialPresentationDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  stock: number;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  medicineId: number;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  packageId: number;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  presentationId: number;
}

export class FilterCommercialPresentationDto {
  @IsPositive()
  @IsOptional()
  @ApiProperty()
  readonly medicineId?: number;

  @IsPositive()
  @IsOptional()
  @ApiProperty()
  readonly limit?: number;

  @Min(0)
  @IsOptional()
  @ApiProperty()
  readonly offset?: number;
}
