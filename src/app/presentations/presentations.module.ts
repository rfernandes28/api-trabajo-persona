import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PresentationsService } from './presentations.service';
import { PresentationsController } from './presentations.controller';

import { Presentation } from './entities/presentation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Presentation])],
  controllers: [PresentationsController],
  providers: [PresentationsService],
  exports: [PresentationsService],
})
export class PresentationsModule {}
