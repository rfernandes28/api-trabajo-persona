import { PartialType } from '@nestjs/swagger';
import { CreateCommercialPresentationDto } from './create-commercial-presentation.dto';

export class UpdateCommercialPresentationDto extends PartialType(CreateCommercialPresentationDto) {}
