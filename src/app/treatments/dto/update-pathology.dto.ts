import { PartialType } from '@nestjs/swagger';
import { CreateTreatmentDto } from './create-pathology.dto';

export class UpdateTreatmentDto extends PartialType(CreateTreatmentDto) {}
