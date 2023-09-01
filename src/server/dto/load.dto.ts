import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export enum SheetActivePrinciple {
  GENERAL = 'GENERAL',
  VITAMINA = 'VITAMINA',
  COLIRIO = 'COLIRIO',
  CREMA = 'CREMA',
}

export enum Action {
  CARGAR = 'CARGAR',
  REGISTRAR = 'REGISTRAR',
  ENTRADAS = 'ENTRADAS',
  SALIDAS = 'SALIDAS',
}

export enum SheetPatient {
  CCS_0322 = 'CCS 0322',
}

export class LoadPatientDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Seleccionar la hoja a cargar',
  })
  readonly sheet: SheetPatient;
}

export class loadMedicineDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Seleccionar la hoja a cargar',
  })
  readonly sheet: SheetActivePrinciple;

  @IsString()
  @ApiProperty({
    default: Action.CARGAR,
    description:
      'CARGAR: accion para cargar Medicinas, Principios Activos, Paquetes y Presentacion  \n  REGISTRAR: accion para hacer las relaciones de las entidades anteriores  \n  ENTRADAS: accion para registrar entradas de medicinas  \n  SALIDAS: accion para registrar salidas de medicinas ',
  })
  readonly action: Action;
}
