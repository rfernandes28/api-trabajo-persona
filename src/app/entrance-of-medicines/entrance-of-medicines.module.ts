import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EntranceOfMedicinesService } from './entrance-of-medicines.service';
import { EntranceOfMedicinesController } from './entrance-of-medicines.controller';

import { EntranceOfMedicine } from './entities/entrance-of-medicine.entity';
import { CommercialPresentationsModule } from '../commercial-presentations/commercial-presentations.module';
import { EntranceOfMedicineSubscriber } from './entrance-of-mediicine.subscriber';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EntranceOfMedicine]),
    CommercialPresentationsModule,
    UsersModule,
  ],
  controllers: [EntranceOfMedicinesController],
  providers: [EntranceOfMedicinesService, EntranceOfMedicineSubscriber],
  exports: [EntranceOfMedicinesService],
})
export class EntranceOfMedicinesModule {}
