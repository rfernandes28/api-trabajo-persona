import { Module } from '@nestjs/common';
import { OutletOfMedicinesService } from './outlet-of-medicines.service';
import { OutletOfMedicinesController } from './outlet-of-medicines.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OutletOfMedicine } from './entities/outlet-of-medicine.entity';
import { MedicinesModule } from '../medicines/medicines.module';

@Module({
  imports: [TypeOrmModule.forFeature([OutletOfMedicine]), MedicinesModule],
  controllers: [OutletOfMedicinesController],
  providers: [OutletOfMedicinesService],
  exports: [OutletOfMedicinesService],
})
export class OutletOfMedicinesModule {}
