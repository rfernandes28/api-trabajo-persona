import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import {
  CreatePresentationDto,
  FilterPresentationDto,
} from './dto/create-presentation.dto';
import { UpdatePresentationDto } from './dto/update-presentation.dto';
import { Presentation } from './entities/presentation.entity';

@Injectable()
export class PresentationsService {
  constructor(
    @InjectRepository(Presentation)
    private presentationRepo: Repository<Presentation>,
  ) {}

  create(createPresentationDto: CreatePresentationDto) {
    const newPresentation = this.presentationRepo.create(createPresentationDto);

    return this.presentationRepo.save(newPresentation);
  }

  findAll(params?: FilterPresentationDto) {
    if (params) {
      const { limit, offset, order, sortBy } = params;

      const where: FindOptionsWhere<Presentation> = {};

      return this.presentationRepo.find({
        where,
        take: limit,
        skip: offset,
        order: { [sortBy]: order },
      });
    }
    return this.presentationRepo.find();
  }

  async findOne(id: number) {
    const presentation = await this.presentationRepo.findOneBy({ id });
    if (!presentation) {
      throw new NotFoundException(`Presentation #${id} not found`);
    }
    return presentation;
  }

  async findByName(name: string) {
    return await this.presentationRepo.findOne({ where: { name } });
  }

  async update(id: number, updatePresentationDto: UpdatePresentationDto) {
    const presentation = await this.presentationRepo.findOneBy({ id });

    this.presentationRepo.merge(presentation, updatePresentationDto);

    return this.presentationRepo.save(presentation);
  }

  remove(id: number) {
    return this.presentationRepo.delete(id);
  }
}
