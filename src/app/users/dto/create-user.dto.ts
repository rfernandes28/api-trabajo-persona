import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly lastName: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly identificationNumber: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly code: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly note: string;
}
