import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';

import { CreateStatusDto, FilterStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Status } from './entities/status.entity';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status) private statusRepo: Repository<Status>,
  ) {}

  create(createStatusDto: CreateStatusDto) {
    const newStatus = this.statusRepo.create(createStatusDto);

    return this.statusRepo.save(newStatus);
  }

  findAll(params?: FilterStatusDto) {
    if (params) {
      const { limit, offset, order, sortBy, search } = params;
      const where: FindOptionsWhere<Status> = {};

      if (search) {
        where.name = ILike(`%${search}%`);
      }

      return this.statusRepo.find({
        where,
        take: limit,
        skip: offset,
        order: { [sortBy]: order },
      });
    }
    return this.statusRepo.find();
  }

  async findOne(id: number) {
    const status = await this.statusRepo.findOneBy({ id });
    if (!status) {
      throw new NotFoundException(`Status #${id} not found`);
    }
    return status;
  }

  async update(id: number, updateStatusDto: UpdateStatusDto) {
    const status = await this.statusRepo.findOneBy({ id });

    this.statusRepo.merge(status, updateStatusDto);

    return this.statusRepo.save(status);
  }

  remove(id: number) {
    return this.statusRepo.delete(id);
  }
}
