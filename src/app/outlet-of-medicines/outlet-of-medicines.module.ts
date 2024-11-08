import { Module } from '@nestjs/common';
import { OutletOfMedicinesService } from './outlet-of-medicines.service';
import { OutletOfMedicinesController } from './outlet-of-medicines.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OutletOfMedicine } from './entities/outlet-of-medicine.entity';
import { CommercialPresentationsModule } from '../commercial-presentations/commercial-presentations.module';
import { PatientsModule } from '../patients/patients.module';
import { OutletOfMedicineSubscriber } from './outlet-of-medicines.subscriber';

@Module({
  imports: [
    TypeOrmModule.forFeature([OutletOfMedicine]),
    CommercialPresentationsModule,
    PatientsModule,
  ],
  controllers: [OutletOfMedicinesController],
  providers: [OutletOfMedicinesService, OutletOfMedicineSubscriber],
  exports: [OutletOfMedicinesService],
})
export class OutletOfMedicinesModule {}
