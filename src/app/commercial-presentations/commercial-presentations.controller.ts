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
import { CommercialPresentationsService } from './commercial-presentations.service';
import {
  CreateCommercialPresentationDto,
  FilterCommercialPresentationDto,
} from './dto/create-commercial-presentation.dto';
import { UpdateCommercialPresentationDto } from './dto/update-commercial-presentation.dto';

@Controller('commercial-presentations')
export class CommercialPresentationsController {
  constructor(
    private readonly commercialPresentationsService: CommercialPresentationsService,
  ) {}

  @Post()
  create(
    @Body() createCommercialPresentationDto: CreateCommercialPresentationDto,
  ) {
    return this.commercialPresentationsService.create(
      createCommercialPresentationDto,
    );
  }

  @Get()
  findAll(@Query() params: FilterCommercialPresentationDto) {
    return this.commercialPresentationsService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.commercialPresentationsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommercialPresentationDto: UpdateCommercialPresentationDto,
  ) {
    return this.commercialPresentationsService.update(
      id,
      updateCommercialPresentationDto,
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.commercialPresentationsService.remove(id);
  }
}
