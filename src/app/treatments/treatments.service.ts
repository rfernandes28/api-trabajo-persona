import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';

import {
  CreateTreatmentDto,
  FilterTreatmentDto,
} from './dto/create-pathology.dto';
import { UpdateTreatmentDto } from './dto/update-pathology.dto';
import { Treatment } from './entities/treatment.entity';

@Injectable()
export class TreatmentsService {
  constructor(
    @InjectRepository(Treatment) private pathologyRepo: Repository<Treatment>,
  ) {}

  create(createTreatmentDto: CreateTreatmentDto) {
    const newTreatment = this.pathologyRepo.create(createTreatmentDto);

    return this.pathologyRepo.save(newTreatment);
  }

  findAll(params?: FilterTreatmentDto) {
    if (params) {
      const { limit, offset, order, sortBy, search } = params;
      const where: FindOptionsWhere<Treatment> = {};

      if (search) {
        where.name = ILike(`%${search}%`);
      }

      return this.pathologyRepo.find({
        where,
        take: limit,
        skip: offset,
        order: { [sortBy]: order },
      });
    }
    return this.pathologyRepo.find();
  }

  async findOne(id: number) {
    const pathology = await this.pathologyRepo.findOneBy({ id });
    if (!pathology) {
      throw new NotFoundException(`Treatment #${id} not found`);
    }
    return pathology;
  }

  async update(id: number, updateTreatmentDto: UpdateTreatmentDto) {
    const pathology = await this.pathologyRepo.findOneBy({ id });

    this.pathologyRepo.merge(pathology, updateTreatmentDto);

    return this.pathologyRepo.save(pathology);
  }

  remove(id: number) {
    return this.pathologyRepo.delete(id);
  }
}
