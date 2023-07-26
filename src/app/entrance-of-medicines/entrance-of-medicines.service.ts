import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEntranceOfMedicineDto } from './dto/create-entrance-of-medicine.dto';
import { UpdateEntranceOfMedicineDto } from './dto/update-entrance-of-medicine.dto';
import { EntranceOfMedicine } from './entities/entrance-of-medicine.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicinesService } from '../medicines/medicines.service';

@Injectable()
export class EntranceOfMedicinesService {
  constructor(
    @InjectRepository(EntranceOfMedicine)
    private entranceOfMedicineRepo: Repository<EntranceOfMedicine>,
    private medicinesService: MedicinesService,
  ) {}

  async create(createEntranceOfMedicineDto: CreateEntranceOfMedicineDto) {
    const {
      // medicineId,
      unitQuantity,
      boxesQuantity,
      expiration,
      expire,
      donor,
    } = createEntranceOfMedicineDto;
    // const medicine = await this.medicinesService.findOne(medicineId);
    const newEntranceOfMedicine = new EntranceOfMedicine();

    // newEntranceOfMedicine.medicine = medicine;
    newEntranceOfMedicine.unitQuantity = unitQuantity;
    newEntranceOfMedicine.boxesQuantity = boxesQuantity;
    newEntranceOfMedicine.expiration = expiration;
    newEntranceOfMedicine.expire = expire;
    newEntranceOfMedicine.donor = donor;

    return this.entranceOfMedicineRepo.save(newEntranceOfMedicine);
  }
  findAll() {
    return this.entranceOfMedicineRepo.find();
  }

  async findOne(id: number) {
    const entranceOfMedicine = await this.entranceOfMedicineRepo.findOneBy({
      id,
    });
    if (!entranceOfMedicine) {
      throw new NotFoundException(`EntranceOfMedicine #${id} not found`);
    }
    return entranceOfMedicine;
  }

  async update(
    id: number,
    updateEntranceOfMedicineDto: UpdateEntranceOfMedicineDto,
  ) {
    const entranceOfMedicine = await this.entranceOfMedicineRepo.findOneBy({
      id,
    });

    this.entranceOfMedicineRepo.merge(
      entranceOfMedicine,
      updateEntranceOfMedicineDto,
    );

    return this.entranceOfMedicineRepo.save(entranceOfMedicine);
  }

  remove(id: number) {
    return this.entranceOfMedicineRepo.delete(id);
  }
}
