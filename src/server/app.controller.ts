import {
  Controller,
  InternalServerErrorException,
  Logger,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiConsumes, ApiTags, ApiOperation } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiFile } from '../decorators/apiFile.decorator';
import {
  LoadCommunityDto,
  LoadPatientDto,
  loadMedicineDto,
  loadMedicineFromTreatmentDto,
} from './dto/load.dto';

@ApiTags('master')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('load-communities')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Carga de comunidades',
    description:
      'Este metodo se ejecutara con el excel "tratamientos" sobre la pestaña "CSS 0323" unicamente',
  })
  @ApiFile('file')
  @UseInterceptors(FileInterceptor('file'))
  loadCommunities(
    @UploadedFile() file: Express.Multer.File,
    @Query() loadDto: LoadCommunityDto,
  ) {
    if (!file)
      throw new InternalServerErrorException('No se ha encontrado el archivo');
    const { sheet } = loadDto;
    Logger.log(
      `loadCommunities> fileName: ${file.originalname} sheet: ${sheet}`,
      AppController.name,
    );

    this.appService.loadCommunities(file, sheet);
  }

  @Post('load-patients')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Carga de pacientes',
    description: 'Este metodo se ejecutara con el excel "tratamientos"',
  })
  @ApiFile('file')
  @UseInterceptors(FileInterceptor('file'))
  loadPatients(
    @UploadedFile() file: Express.Multer.File,
    @Query() loadDto: LoadPatientDto,
  ) {
    if (!file)
      throw new InternalServerErrorException('No se ha encontrado el archivo');
    const { sheet } = loadDto;
    Logger.log(
      `loadPatients> fileName: ${file.originalname} sheet: ${sheet}`,
      AppController.name,
    );

    this.appService.loadPatients(file, sheet);
  }

  @Post('load-medicines-treatments')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary:
      'Carga de principio activo, empaque y presentacion de los medicamentos',
    description: 'Este metodo se ejecutara con el excel "tratamientos"',
  })
  @ApiFile('file')
  @UseInterceptors(FileInterceptor('file'))
  loadMedicinesFromTreatments(
    @UploadedFile() file: Express.Multer.File,
    @Query() loadDto: loadMedicineFromTreatmentDto,
  ) {
    if (!file)
      throw new InternalServerErrorException('No se ha encontrado el archivo');
    const { sheet, action } = loadDto;

    Logger.log(
      `loadMedicinesFromTreatments> fileName: ${file.originalname} sheet: ${sheet}, accion: ${action}`,
      AppController.name,
    );

    this.appService.loadMedicinesFromTreatments(file, sheet, action);
  }

  @Post('load-medicines')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary:
      'Carga de principio activo, empaque y presentacion de los medicamentos',
    description: 'Este metodo se ejecutara con el excel "inventario"',
  })
  @ApiFile('file')
  @UseInterceptors(FileInterceptor('file'))
  loadMedicines(
    @UploadedFile() file: Express.Multer.File,
    @Query() loadDto: loadMedicineDto,
  ) {
    if (!file)
      throw new InternalServerErrorException('No se ha encontrado el archivo');

    const { sheet, action } = loadDto;

    Logger.log(
      `loadMedicines> fileName: ${file.originalname} sheet: ${sheet}, accion: ${action}`,
      AppController.name,
    );

    return this.appService.loadMedicines(file, sheet, action);
  }
}
