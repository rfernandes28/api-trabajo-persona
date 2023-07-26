import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PathologiesService } from './pathologies.service';
import { PathologiesController } from './pathologies.controller';

import { Pathology } from './entities/pathology.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pathology])],
  controllers: [PathologiesController],
  providers: [PathologiesService],
  exports: [PathologiesService],
})
export class PathologiesModule {}
