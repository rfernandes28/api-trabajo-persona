import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EntranceOfMedicinesService } from './entrance-of-medicines.service';
import { CreateEntranceOfMedicineDto } from './dto/create-entrance-of-medicine.dto';
import { UpdateEntranceOfMedicineDto } from './dto/update-entrance-of-medicine.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('entrance-of-medicines')
@Controller('entrance-of-medicines')
export class EntranceOfMedicinesController {
  constructor(
    private readonly entranceOfMedicinesService: EntranceOfMedicinesService,
  ) {}

  @Post()
  create(@Body() createEntranceOfMedicineDto: CreateEntranceOfMedicineDto) {
    return this.entranceOfMedicinesService.create(createEntranceOfMedicineDto);
  }

  @Get()
  findAll() {
    return this.entranceOfMedicinesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entranceOfMedicinesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEntranceOfMedicineDto: UpdateEntranceOfMedicineDto,
  ) {
    return this.entranceOfMedicinesService.update(
      +id,
      updateEntranceOfMedicineDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entranceOfMedicinesService.remove(+id);
  }
}
