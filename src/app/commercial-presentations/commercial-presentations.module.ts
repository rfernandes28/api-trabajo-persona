import { Module } from '@nestjs/common';
import { CommercialPresentationsService } from './commercial-presentations.service';
import { CommercialPresentationsController } from './commercial-presentations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommercialPresentation } from './entities/commercial-presentation.entity';
import { MedicinesModule } from '../medicines/medicines.module';
import { PackagesModule } from '../packages/packages.module';
import { PresentationsModule } from '../presentations/presentations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommercialPresentation]),
    MedicinesModule,
    PackagesModule,
    PresentationsModule,
  ],
  controllers: [CommercialPresentationsController],
  providers: [CommercialPresentationsService],
  exports: [CommercialPresentationsService],
})
export class CommercialPresentationsModule {}
