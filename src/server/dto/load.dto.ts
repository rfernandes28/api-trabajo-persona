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
}

export enum ActionOut {
  CARGAR = 'CARGAR',
  REGISTRAR = 'REGISTRAR',
  SALIDAS = 'SALIDAS',
}

export enum SheetPatient {
  CCS_0322 = 'CCS 0322',
  TOC_HUM_DUA_0322 = 'TOC HUM DUA 0322',
  VALERA = 'VALERA',
  MERIDA = 'MERIDA',
}

export class LoadPatientDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Seleccionar la hoja a cargar',
  })
  readonly sheet: SheetPatient;
}

export class LoadCommunityDto {
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
      'CARGAR: accion para cargar Medicinas, Principios Activos, Paquetes y Presentacion  \n  REGISTRAR: accion para hacer las relaciones de las entidades anteriores  \n  ENTRADAS: accion para registrar entradas de medicinas  ',
  })
  readonly action: Action;
}

export class loadMedicineFromTreatmentDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Seleccionar la hoja a cargar',
  })
  readonly sheet: SheetPatient;

  @IsString()
  @ApiProperty({
    default: ActionOut.CARGAR,
    description:
      'CARGAR: accion para cargar Medicinas, Principios Activos, Presentacion  \n  REGISTRAR: accion para hacer las relaciones de las entidades anteriores',
  })
  readonly action: ActionOut;
}
