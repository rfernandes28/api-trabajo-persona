import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

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
