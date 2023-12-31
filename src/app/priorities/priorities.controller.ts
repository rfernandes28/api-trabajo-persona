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
import { ApiTags } from '@nestjs/swagger';

import { PrioritiesService } from './priorities.service';
import {
  CreatePriorityDto,
  FilterPriorityDto,
} from './dto/create-priority.dto';
import { UpdatePriorityDto } from './dto/update-priority.dto';

@ApiTags('priorities')
@Controller('priorities')
export class PrioritiesController {
  constructor(private readonly prioritiesService: PrioritiesService) {}

  @Post()
  create(@Body() createPriorityDto: CreatePriorityDto) {
    return this.prioritiesService.create(createPriorityDto);
  }

  @Get()
  findAll(@Query() params: FilterPriorityDto) {
    return this.prioritiesService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.prioritiesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePriorityDto: UpdatePriorityDto,
  ) {
    return this.prioritiesService.update(id, updatePriorityDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.prioritiesService.remove(id);
  }
}
