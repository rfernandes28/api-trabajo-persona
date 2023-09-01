import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient) private patientRepo: Repository<Patient>,
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    const newPatient = this.patientRepo.create(createPatientDto);

    return await this.patientRepo.save(newPatient);
  }

  findAll() {
    return this.patientRepo.find();
  }

  async findOne(id: number) {
    const patient = await this.patientRepo.findOneBy({ id });
    if (!patient) {
      throw new NotFoundException(`Patient #${id} not found`);
    }
    return patient;
  }

  async findByCode(code: string) {
    return this.patientRepo.findOne({ where: { code } });
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    const patient = await this.patientRepo.findOneBy({ id });

    this.patientRepo.merge(patient, updatePatientDto);

    return this.patientRepo.save(patient);
  }

  remove(id: number) {
    return this.patientRepo.delete(id);
  }
}
