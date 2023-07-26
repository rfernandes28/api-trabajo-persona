import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOutletOfMedicineDto } from './dto/create-outlet-of-medicine.dto';
import { UpdateOutletOfMedicineDto } from './dto/update-outlet-of-medicine.dto';
import { OutletOfMedicine } from './entities/outlet-of-medicine.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicinesService } from '../medicines/medicines.service';

@Injectable()
export class OutletOfMedicinesService {
  constructor(
    @InjectRepository(OutletOfMedicine)
    private outletOfMedicineRepo: Repository<OutletOfMedicine>,
    private medicinesService: MedicinesService,
  ) {}

  async create(createOutletOfMedicineDto: CreateOutletOfMedicineDto) {
    const { medicineId, unitQuantity } = createOutletOfMedicineDto;

    const medicine = await this.medicinesService.findOne(medicineId);
    const newOutletOfMedicine = new OutletOfMedicine();

    newOutletOfMedicine.medicine = medicine;
    newOutletOfMedicine.unitQuantity = unitQuantity;

    return this.outletOfMedicineRepo.save(newOutletOfMedicine);
  }

  findAll() {
    return this.outletOfMedicineRepo.find();
  }

  async findOne(id: number) {
    const outletOfMedicine = await this.outletOfMedicineRepo.findOneBy({ id });
    if (!outletOfMedicine) {
      throw new NotFoundException(`OutletOfMedicine #${id} not found`);
    }
    return outletOfMedicine;
  }

  async update(
    id: number,
    updateOutletOfMedicineDto: UpdateOutletOfMedicineDto,
  ) {
    const outletOfMedicine = await this.outletOfMedicineRepo.findOneBy({ id });

    this.outletOfMedicineRepo.merge(
      outletOfMedicine,
      updateOutletOfMedicineDto,
    );

    return this.outletOfMedicineRepo.save(outletOfMedicine);
  }

  remove(id: number) {
    return this.outletOfMedicineRepo.delete(id);
  }
}
