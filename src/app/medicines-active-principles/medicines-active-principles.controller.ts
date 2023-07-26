import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MedicinesActivePrinciplesService } from './medicines-active-principles.service';
import { CreateMedicinesActivePrincipleDto } from './dto/create-medicines-active-principle.dto';
import { UpdateMedicinesActivePrincipleDto } from './dto/update-medicines-active-principle.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('medicines-active-principles')
@Controller('medicines-active-principles')
export class MedicinesActivePrinciplesController {
  constructor(
    private readonly medicinesActivePrinciplesService: MedicinesActivePrinciplesService,
  ) {}

  @Post()
  create(
    @Body()
    createMedicinesActivePrincipleDto: CreateMedicinesActivePrincipleDto,
  ) {
    return this.medicinesActivePrinciplesService.create(
      createMedicinesActivePrincipleDto,
    );
  }

  @Get()
  findAll() {
    return this.medicinesActivePrinciplesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicinesActivePrinciplesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateMedicinesActivePrincipleDto: UpdateMedicinesActivePrincipleDto,
  ) {
    return this.medicinesActivePrinciplesService.update(
      +id,
      updateMedicinesActivePrincipleDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicinesActivePrinciplesService.remove(+id);
  }
}
