import { PartialType } from '@nestjs/swagger';
import { CreateMedicinesActivePrincipleDto } from './create-medicines-active-principle.dto';

export class UpdateMedicinesActivePrincipleDto extends PartialType(
  CreateMedicinesActivePrincipleDto,
) {}
