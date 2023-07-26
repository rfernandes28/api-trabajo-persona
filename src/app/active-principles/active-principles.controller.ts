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

import { ActivePrinciplesService } from './active-principles.service';
import {
  CreateActivePrincipleDto,
  FilterActivePrinciplesDto,
} from './dto/create-active-principle.dto';
import { UpdateActivePrincipleDto } from './dto/update-active-principle.dto';

@ApiTags('active-principles')
@Controller('active-principles')
export class ActivePrinciplesController {
  constructor(
    private readonly activePrinciplesService: ActivePrinciplesService,
  ) {}

  @Post()
  create(@Body() createActivePrincipleDto: CreateActivePrincipleDto) {
    return this.activePrinciplesService.create(createActivePrincipleDto);
  }

  @Get()
  findAll(@Query() params: FilterActivePrinciplesDto) {
    return this.activePrinciplesService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.activePrinciplesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateActivePrincipleDto: UpdateActivePrincipleDto,
  ) {
    return this.activePrinciplesService.update(id, updateActivePrincipleDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.activePrinciplesService.remove(id);
  }
}
