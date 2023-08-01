import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateCommercialPresentationDto,
  FilterCommercialPresentationDto,
} from './dto/create-commercial-presentation.dto';
import { UpdateCommercialPresentationDto } from './dto/update-commercial-presentation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CommercialPresentation } from './entities/commercial-presentation.entity';
import { MedicinesService } from '../medicines/medicines.service';

@Injectable()
export class CommercialPresentationsService {
  constructor(
    @InjectRepository(CommercialPresentation)
    private commercialPresentationRepo: Repository<CommercialPresentation>,
    private medicinesService: MedicinesService,
  ) {}

  async create(
    createCommercialPresentationDto: CreateCommercialPresentationDto,
  ) {
    const { name, stock, medicineId } = createCommercialPresentationDto;

    const medicine = await this.medicinesService.findOne(medicineId);

    const commercialPresentation = new CommercialPresentation();

    commercialPresentation.medicine = medicine;
    commercialPresentation.stock = stock;
    commercialPresentation.name = name;

    return this.commercialPresentationRepo.save(commercialPresentation);
  }

  findAll(params?: FilterCommercialPresentationDto) {
    if (params) {
      const where: FindOptionsWhere<CommercialPresentation> = {};
      const { limit, offset, medicineId } = params;

      if (medicineId) {
        where.medicine = { id: medicineId };
      }

      return this.commercialPresentationRepo.find({
        where,
        take: limit,
        skip: offset,
      });
    }

    return this.commercialPresentationRepo.find();
  }

  async findOne(id: number) {
    const commercialPresentationData =
      await this.commercialPresentationRepo.findOneBy({ id });
    if (!commercialPresentationData) {
      throw new NotFoundException(`CommercialPresentation #${id} not found`);
    }
    return commercialPresentationData;
  }

  async update(
    id: number,
    updateCommercialPresentationDto: UpdateCommercialPresentationDto,
  ) {
    const commercialPresentationData =
      await this.commercialPresentationRepo.findOneBy({ id });

    this.commercialPresentationRepo.merge(
      commercialPresentationData,
      updateCommercialPresentationDto,
    );

    return this.commercialPresentationRepo.save(commercialPresentationData);
  }

  remove(id: number) {
    return this.commercialPresentationRepo.delete(id);
  }
}