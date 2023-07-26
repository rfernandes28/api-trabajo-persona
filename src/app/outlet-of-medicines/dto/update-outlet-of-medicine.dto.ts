import { PartialType } from '@nestjs/swagger';
import { CreateOutletOfMedicineDto } from './create-outlet-of-medicine.dto';

export class UpdateOutletOfMedicineDto extends PartialType(CreateOutletOfMedicineDto) {}
