import { PartialType } from '@nestjs/swagger';
import { CreateEntranceOfMedicineDto } from './create-entrance-of-medicine.dto';

export class UpdateEntranceOfMedicineDto extends PartialType(CreateEntranceOfMedicineDto) {}
