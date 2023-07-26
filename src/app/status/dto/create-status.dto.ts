import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStatusDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly name: string;
}
