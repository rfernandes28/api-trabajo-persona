import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPositive, IsString, Min } from 'class-validator';

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
}
