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
import { OutletOfMedicinesService } from './outlet-of-medicines.service';
import {
  CreateOutletOfMedicineDto,
  FilterOutletOfMedicineDto,
} from './dto/create-outlet-of-medicine.dto';
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
  findAll(@Query() params: FilterOutletOfMedicineDto) {
    return this.outletOfMedicinesService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.outletOfMedicinesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOutletOfMedicineDto: UpdateOutletOfMedicineDto,
  ) {
    return this.outletOfMedicinesService.update(id, updateOutletOfMedicineDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.outletOfMedicinesService.remove(id);
  }
}
