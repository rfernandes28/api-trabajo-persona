import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import {
  CreateMedicineDto,
  FilterMedicineDto,
} from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { Medicine } from './entities/medicine.entity';

@Injectable()
export class MedicinesService {
  constructor(
    @InjectRepository(Medicine) private medicineRepo: Repository<Medicine>,
  ) {}

  create(createMedicineDto: CreateMedicineDto) {
    const newMedicine = this.medicineRepo.create(createMedicineDto);

    return this.medicineRepo.save(newMedicine);
  }

  findAll(params?: FilterMedicineDto) {
    if (params) {
      const where: FindOptionsWhere<Medicine> = {};
      const { limit, offset, sortBy, order } = params;

      return this.medicineRepo.find({
        where,
        take: limit,
        skip: offset,
        order: { [sortBy]: order },
      });
    }

    return this.medicineRepo.find();
  }

  async findOne(id: number) {
    const medicine = await this.medicineRepo.findOne({
      where: { id },
      relations: [
        'commercialPresentations',
        'commercialPresentations.activePrinciples',
        'commercialPresentations.activePrinciples.activePrinciple',
        'commercialPresentations.package',
        'commercialPresentations.presentation',
      ],
    });
    if (!medicine) {
      throw new NotFoundException(`Medicine #${id} not found`);
    }
    return medicine;
  }

  async findByName(name: string) {
    return await this.medicineRepo.findOne({ where: { name } });
  }

  async update(id: number, updateMedicineDto: UpdateMedicineDto) {
    const medicine = await this.medicineRepo.findOneBy({ id });

    this.medicineRepo.merge(medicine, updateMedicineDto);

    return this.medicineRepo.save(medicine);
  }

  remove(id: number) {
    return this.medicineRepo.delete(id);
  }
}
