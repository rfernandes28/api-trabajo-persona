import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';

import { CreatePatientDto, FilterPatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';
import { CommunitiesService } from '../communities/communities.service';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient) private patientRepo: Repository<Patient>,
    private communitiesService: CommunitiesService,
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    try {
      const {
        name,
        lastName,
        note,
        communityId,
        identificationNumber,
        contactPerson,
        code,
      } = createPatientDto;
      const newPatient = new Patient();

      let community = null;

      if (communityId) {
        community = await this.communitiesService.findOne(communityId);
      }

      newPatient.identificationNumber = identificationNumber;
      newPatient.name = name;
      newPatient.lastName = lastName;
      newPatient.code = code;
      newPatient.note = note;
      newPatient.contactPerson = contactPerson;
      newPatient.community = community;

      return await this.patientRepo.save(newPatient);
    } catch (error) {
      return error;
    }
  }

  findAll(params?: FilterPatientDto) {
    if (params) {
      const where: FindOptionsWhere<Patient> = {};
      const { limit, offset, order, sortBy, search } = params;

      if (search) {
        where.name = ILike(`%${search}%`);
      }

      return this.patientRepo.find({
        where,
        take: limit,
        skip: offset,
        order: { [sortBy]: order },
      });
    }
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
