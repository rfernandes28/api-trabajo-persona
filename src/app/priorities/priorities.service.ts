import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';

import {
  CreatePriorityDto,
  FilterPriorityDto,
} from './dto/create-priority.dto';
import { UpdatePriorityDto } from './dto/update-priority.dto';
import { Priority } from './entities/priority.entity';

@Injectable()
export class PrioritiesService {
  constructor(
    @InjectRepository(Priority) private priorityRepo: Repository<Priority>,
  ) {}

  create(createPriorityDto: CreatePriorityDto) {
    const newPriority = this.priorityRepo.create(createPriorityDto);

    return this.priorityRepo.save(newPriority);
  }

  findAll(params?: FilterPriorityDto) {
    if (params) {
      const { limit, offset, order, sortBy, search } = params;
      const where: FindOptionsWhere<Priority> = {};

      if (search) {
        where.name = ILike(`%${search}%`);
      }

      return this.priorityRepo.find({
        where,
        take: limit,
        skip: offset,
        order: { [sortBy]: order },
      });
    }

    return this.priorityRepo.find();
  }

  async findOne(id: number) {
    const priority = await this.priorityRepo.findOneBy({ id });
    if (!priority) {
      throw new NotFoundException(`Priority #${id} not found`);
    }
    return priority;
  }

  async update(id: number, updatePriorityDto: UpdatePriorityDto) {
    const priority = await this.priorityRepo.findOneBy({ id });

    this.priorityRepo.merge(priority, updatePriorityDto);

    return this.priorityRepo.save(priority);
  }

  remove(id: number) {
    return this.priorityRepo.delete(id);
  }
}
