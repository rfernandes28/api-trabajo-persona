import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OutletOfMedicinesService } from './outlet-of-medicines.service';
import { CreateOutletOfMedicineDto } from './dto/create-outlet-of-medicine.dto';
import { UpdateOutletOfMedicineDto } from './dto/update-outlet-of-medicine.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('outlet-of-medicines')
@Controller('outlet-of-medicines')
export class OutletOfMedicinesController {
  constructor(
    private readonly outletOfMedicinesService: OutletOfMedicinesService,
  ) {}

  @Post()
  create(@Body() createOutletOfMedicineDto: CreateOutletOfMedicineDto) {
    return this.outletOfMedicinesService.create(createOutletOfMedicineDto);
  }

  @Get()
  findAll() {
    return this.outletOfMedicinesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.outletOfMedicinesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOutletOfMedicineDto: UpdateOutletOfMedicineDto,
  ) {
    return this.outletOfMedicinesService.update(+id, updateOutletOfMedicineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.outletOfMedicinesService.remove(+id);
  }
}