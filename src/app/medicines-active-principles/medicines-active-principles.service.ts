import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMedicinesActivePrincipleDto } from './dto/create-medicines-active-principle.dto';
import { UpdateMedicinesActivePrincipleDto } from './dto/update-medicines-active-principle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicinesActivePrinciple } from './entities/medicines-active-principle.entity';
import { MedicinesService } from '../medicines/medicines.service';
import { ActivePrinciplesService } from '../active-principles/active-principles.service';
import { PackagesService } from '../packages/packages.service';
import { PresentationsService } from '../presentations/presentations.service';

@Injectable()
export class MedicinesActivePrinciplesService {
  constructor(
    @InjectRepository(MedicinesActivePrinciple)
    private medicinesActivePrincipleRepo: Repository<MedicinesActivePrinciple>,
    private medicinesService: MedicinesService,
    private activePrinciplesService: ActivePrinciplesService,
    private packagesService: PackagesService,
    private presentationsService: PresentationsService,
  ) {}

  async create(
    createMedicinesActivePrincipleDto: CreateMedicinesActivePrincipleDto,
  ) {
    const {
      medicineId,
      activePrincipleId,
      stock,
      concentration,
      packageId,
      presentationId,
    } = createMedicinesActivePrincipleDto;
    const medicine = await this.medicinesService.findOne(medicineId);

    const activePrinciple = await this.activePrinciplesService.findOne(
      activePrincipleId,
    );

    const packageData = await this.packagesService.findOne(packageId);

    const presentation = await this.presentationsService.findOne(
      presentationId,
    );

    const medicinesActivePrinciple = new MedicinesActivePrinciple();

    medicinesActivePrinciple.medicine = medicine;
    medicinesActivePrinciple.activePrinciple = activePrinciple;
    medicinesActivePrinciple.packages = packageData;
    medicinesActivePrinciple.presentations = presentation;
    medicinesActivePrinciple.concentration = concentration;

    return this.medicinesActivePrincipleRepo.save(medicinesActivePrinciple);
  }

  findAll() {
    return this.medicinesActivePrincipleRepo.find({
      relations: ['activePrinciple', 'medicine'],
    });
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
