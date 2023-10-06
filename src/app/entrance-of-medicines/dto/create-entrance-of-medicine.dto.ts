import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { order } from 'src/common/constants';

export class CreateEntranceOfMedicineDto {
  @IsOptional()
  @IsPositive()
  @ApiProperty()
  readonly unitQuantity: number;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly boxesQuantity: number;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  readonly expiration: Date;

  @IsOptional()
  @ApiProperty()
  readonly expire: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly donor: string;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly commercialPresentationId: number;
}

export class FilterEntranceOfMedicineDto {
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
