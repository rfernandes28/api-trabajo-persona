import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsPositive, IsString, Min } from 'class-validator';
import { order } from 'src/common/constants';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly lastName: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly userName: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly identificationNumber: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly email: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly password: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly role: string;
}

export class FilterUserDto {
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
