import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePathologyDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly name: string;
}
