import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateEntranceOfMedicineDto,
  FilterEntranceOfMedicineDto,
} from './dto/create-entrance-of-medicine.dto';
import { UpdateEntranceOfMedicineDto } from './dto/update-entrance-of-medicine.dto';
import { EntranceOfMedicine } from './entities/entrance-of-medicine.entity';
import { CommercialPresentationsService } from '../commercial-presentations/commercial-presentations.service';

@Injectable()
export class EntranceOfMedicinesService {
  constructor(
    @InjectRepository(EntranceOfMedicine)
    private entranceOfMedicineRepo: Repository<EntranceOfMedicine>,
    private commercialPresentationsService: CommercialPresentationsService,
  ) {}

  async create(createEntranceOfMedicineDto: CreateEntranceOfMedicineDto) {
    const {
      commercialPresentationId,
      unitQuantity,
      boxesQuantity,
      expiration,
      expire,
      donor,
    } = createEntranceOfMedicineDto;
    const commercialPresentation =
      await this.commercialPresentationsService.findOne(
        commercialPresentationId,
      );
    const newEntranceOfMedicine = new EntranceOfMedicine();

    newEntranceOfMedicine.commercialPresentation = commercialPresentation;
    newEntranceOfMedicine.unitQuantity = unitQuantity;
    newEntranceOfMedicine.boxesQuantity = boxesQuantity;
    newEntranceOfMedicine.expiration = expiration;
    newEntranceOfMedicine.expire = expire;
    newEntranceOfMedicine.donor = donor;

    return this.entranceOfMedicineRepo.save(newEntranceOfMedicine);
  }

  findAll(params?: FilterEntranceOfMedicineDto) {
    if (params) {
      const where: FindOptionsWhere<EntranceOfMedicine> = {};
      const { limit, offset, commercialPresentationId, sortBy, order } = params;

      if (commercialPresentationId) {
        where.commercialPresentation = { id: commercialPresentationId };
      }

      return this.entranceOfMedicineRepo.find({
        where,
        take: limit,
        skip: offset,
        order: { [sortBy]: order },
        relations: ['commercialPresentation'],
      });
    }

    return this.entranceOfMedicineRepo.find();
  }

  async findOne(id: number) {
    const entranceOfMedicine = await this.entranceOfMedicineRepo.findOne({
      where: { id },
      relations: ['commercialPresentation'],
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
