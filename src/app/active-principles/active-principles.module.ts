import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActivePrinciplesService } from './active-principles.service';
import { ActivePrinciplesController } from './active-principles.controller';

import { ActivePrinciple } from './entities/active-principle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActivePrinciple])],
  controllers: [ActivePrinciplesController],
  providers: [ActivePrinciplesService],
  exports: [ActivePrinciplesService],
})
export class ActivePrinciplesModule {}
