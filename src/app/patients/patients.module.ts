import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';

import { Patient } from './entities/patient.entity';
import { CommunitiesModule } from '../communities/communities.module';

@Module({
  imports: [TypeOrmModule.forFeature([Patient]), CommunitiesModule],
  controllers: [PatientsController],
  providers: [PatientsService],
  exports: [PatientsService],
})
export class PatientsModule {}
