import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateMedicinesActivePrincipleDto,
  FilterMedicinesActiveDto,
} from './dto/create-medicines-active-principle.dto';
import { UpdateMedicinesActivePrincipleDto } from './dto/update-medicines-active-principle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { MedicinesActivePrinciple } from './entities/medicines-active-principle.entity';
import { ActivePrinciplesService } from '../active-principles/active-principles.service';
import { CommercialPresentationsService } from '../commercial-presentations/commercial-presentations.service';

@Injectable()
export class MedicinesActivePrinciplesService {
  constructor(
    @InjectRepository(MedicinesActivePrinciple)
    private medicinesActivePrincipleRepo: Repository<MedicinesActivePrinciple>,
    private commercialPresentationsService: CommercialPresentationsService,
    private activePrinciplesService: ActivePrinciplesService,
  ) {}

  async create(
    createMedicinesActivePrincipleDto: CreateMedicinesActivePrincipleDto,
  ) {
    const { commercialPresentationId, activePrincipleId, concentration } =
      createMedicinesActivePrincipleDto;

    const commercialPresentation =
      await this.commercialPresentationsService.findOne(
        commercialPresentationId,
      );

    const activePrinciple = await this.activePrinciplesService.findOne(
      activePrincipleId,
    );

    const medicinesActivePrinciple = new MedicinesActivePrinciple();

    medicinesActivePrinciple.commercialPresentation = commercialPresentation;
    medicinesActivePrinciple.activePrinciple = activePrinciple;
    medicinesActivePrinciple.concentration = concentration;

    return this.medicinesActivePrincipleRepo.save(medicinesActivePrinciple);
  }

  findAll(params?: FilterMedicinesActiveDto) {
    if (params) {
      const where: FindOptionsWhere<MedicinesActivePrinciple> = {};
      const { limit, offset, order, sortBy, search } = params;

      if (search) {
        where.commercialPresentation = { name: ILike(`%${search}%`) };
      }
      return this.medicinesActivePrincipleRepo.find({
        where,
        take: limit,
        skip: offset,
        order: { [sortBy]: order },
        relations: ['activePrinciple', 'commercialPresentation'],
      });
    }

    return this.medicinesActivePrincipleRepo.find();
  }

  async findOne(id: number) {
    const MedicinesActivePrinciple =
      await this.medicinesActivePrincipleRepo.findOneBy({ id });
    if (!MedicinesActivePrinciple) {
      throw new NotFoundException(`MedicinesActivePrinciple #${id} not found`);
    }
    return MedicinesActivePrinciple;
  }

  async update(
    id: number,
    updateMedicinesActivePrincipleDto: UpdateMedicinesActivePrincipleDto,
  ) {
    const medicinesActivePrinciple =
      await this.medicinesActivePrincipleRepo.findOneBy({ id });

    this.medicinesActivePrincipleRepo.merge(
      medicinesActivePrinciple,
      updateMedicinesActivePrincipleDto,
    );

    return this.medicinesActivePrincipleRepo.save(medicinesActivePrinciple);
  }

  remove(id: number) {
    return this.medicinesActivePrincipleRepo.delete(id);
  }
}
