import { Module } from '@nestjs/common';
import { CommercialPresentationsService } from './commercial-presentations.service';
import { CommercialPresentationsController } from './commercial-presentations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommercialPresentation } from './entities/commercial-presentation.entity';
import { MedicinesModule } from '../medicines/medicines.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommercialPresentation]),
    MedicinesModule,
  ],
  controllers: [CommercialPresentationsController],
  providers: [CommercialPresentationsService],
  exports: [CommercialPresentationsService],
})
export class CommercialPresentationsModule {}
