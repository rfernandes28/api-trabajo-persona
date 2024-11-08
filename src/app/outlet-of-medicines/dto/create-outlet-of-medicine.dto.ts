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

export class CreateOutletOfMedicineDto {
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly unitQuantity: number;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly commercialPresentationId: number;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly patientId: number;

  @IsOptional()
  @ApiProperty()
  readonly createAt: Date;
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
