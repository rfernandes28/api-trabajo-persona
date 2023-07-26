import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePresentationDto } from './dto/create-presentation.dto';
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

  findAll() {
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
