import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePathologyDto } from './dto/create-pathology.dto';
import { UpdatePathologyDto } from './dto/update-pathology.dto';
import { Pathology } from './entities/pathology.entity';

@Injectable()
export class PathologiesService {
  constructor(
    @InjectRepository(Pathology) private pathologyRepo: Repository<Pathology>,
  ) {}

  create(createPathologyDto: CreatePathologyDto) {
    const newPathology = this.pathologyRepo.create(createPathologyDto);

    return this.pathologyRepo.save(newPathology);
  }

  findAll() {
    return this.pathologyRepo.find();
  }

  async findOne(id: number) {
    const pathology = await this.pathologyRepo.findOneBy({ id });
    if (!pathology) {
      throw new NotFoundException(`Pathology #${id} not found`);
    }
    return pathology;
  }

  async update(id: number, updatePathologyDto: UpdatePathologyDto) {
    const pathology = await this.pathologyRepo.findOneBy({ id });

    this.pathologyRepo.merge(pathology, updatePathologyDto);

    return this.pathologyRepo.save(pathology);
  }

  remove(id: number) {
    return this.pathologyRepo.delete(id);
  }
}
