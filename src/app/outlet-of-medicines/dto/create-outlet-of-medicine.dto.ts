import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsPositive, Min } from 'class-validator';

export class CreateOutletOfMedicineDto {
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly unitQuantity: number;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly medicineId: number;
}

export class FilterOutletOfMedicineDto {
  @IsOptional()
  @IsPositive()
  @ApiProperty()
  readonly commercialPresentationId?: number;

  @IsPositive()
  @IsOptional()
  @ApiProperty()
  readonly limit?: number;

  @Min(0)
  @IsOptional()
  @ApiProperty()
  readonly offset?: number;
}
