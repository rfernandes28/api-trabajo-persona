import { Module } from '@nestjs/common';
import { MedicinesActivePrinciplesService } from './medicines-active-principles.service';
import { MedicinesActivePrinciplesController } from './medicines-active-principles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicinesActivePrinciple } from './entities/medicines-active-principle.entity';
import { MedicinesModule } from '../medicines/medicines.module';
import { ActivePrinciplesModule } from '../active-principles/active-principles.module';
import { PackagesModule } from '../packages/packages.module';
import { PresentationsModule } from '../presentations/presentations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MedicinesActivePrinciple]),
    MedicinesModule,
    ActivePrinciplesModule,
    PackagesModule,
    PresentationsModule,
  ],
  controllers: [MedicinesActivePrinciplesController],
  providers: [MedicinesActivePrinciplesService],
  exports: [MedicinesActivePrinciplesService],
})
export class MedicinesActivePrinciplesModule {}
