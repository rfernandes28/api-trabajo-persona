import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { ActivePrinciple } from './entities/active-principle.entity';
import {
  CreateActivePrincipleDto,
  FilterActivePrinciplesDto,
} from './dto/create-active-principle.dto';
import { UpdateActivePrincipleDto } from './dto/update-active-principle.dto';

@Injectable()
export class ActivePrinciplesService {
  constructor(
    @InjectRepository(ActivePrinciple)
    private activePrincipleRepo: Repository<ActivePrinciple>,
  ) {}

  create(createActivePrincipleDto: CreateActivePrincipleDto) {
    const newActivePrinciple = this.activePrincipleRepo.create(
      createActivePrincipleDto,
    );

    return this.activePrincipleRepo.save(newActivePrinciple);
  }

  findAll(params?: FilterActivePrinciplesDto) {
    if (params) {
      const where: FindOptionsWhere<ActivePrinciple> = {};
      const { limit, offset } = params;

      return this.activePrincipleRepo.find({
        where,
        take: limit,
        skip: offset,
      });
    }

    return this.activePrincipleRepo.find();
  }

  async findOne(id: number) {
    const activePrinciple = await this.activePrincipleRepo.findOneBy({ id });
    if (!activePrinciple) {
      throw new NotFoundException(`ActivePrinciple #${id} not found`);
    }
    return activePrinciple;
  }

  async findByName(name: string) {
    return await this.activePrincipleRepo.findOne({ where: { name } });
  }

  async update(id: number, updateActivePrincipleDto: UpdateActivePrincipleDto) {
    const activePrinciple = await this.activePrincipleRepo.findOneBy({ id });

    this.activePrincipleRepo.merge(activePrinciple, updateActivePrincipleDto);

    return this.activePrincipleRepo.save(activePrinciple);
  }

  remove(id: number) {
    return this.activePrincipleRepo.delete(id);
  }
}
