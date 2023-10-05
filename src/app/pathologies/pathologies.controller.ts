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

import { PathologiesService } from './pathologies.service';
import {
  CreatePathologyDto,
  FilterPathologyDto,
} from './dto/create-pathology.dto';
import { UpdatePathologyDto } from './dto/update-pathology.dto';

@ApiTags('pathologies')
@Controller('pathologies')
export class PathologiesController {
  constructor(private readonly pathologiesService: PathologiesService) {}

  @Post()
  create(@Body() createPathologyDto: CreatePathologyDto) {
    return this.pathologiesService.create(createPathologyDto);
  }

  @Get()
  findAll(@Query() params: FilterPathologyDto) {
    return this.pathologiesService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pathologiesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePathologyDto: UpdatePathologyDto,
  ) {
    return this.pathologiesService.update(id, updatePathologyDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pathologiesService.remove(id);
  }
}
