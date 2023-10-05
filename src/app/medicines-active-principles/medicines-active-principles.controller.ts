import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { MedicinesActivePrinciplesService } from './medicines-active-principles.service';
import {
  CreateMedicinesActivePrincipleDto,
  FilterMedicinesActiveDto,
} from './dto/create-medicines-active-principle.dto';
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
  findAll(@Query() params: FilterMedicinesActiveDto) {
    return this.medicinesActivePrinciplesService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.medicinesActivePrinciplesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateMedicinesActivePrincipleDto: UpdateMedicinesActivePrincipleDto,
  ) {
    return this.medicinesActivePrinciplesService.update(
      id,
      updateMedicinesActivePrincipleDto,
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.medicinesActivePrinciplesService.remove(id);
  }
}
