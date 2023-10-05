import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePackageDto, FilterPackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { Package } from './entities/package.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(Package)
    private packageRepo: Repository<Package>,
  ) {}

  create(createPackageDto: CreatePackageDto) {
    const newPackage = this.packageRepo.create(createPackageDto);

    return this.packageRepo.save(newPackage);
  }

  findAll(params?: FilterPackageDto) {
    if (params) {
      const { limit, offset, order, sortBy } = params;
      const where: FindOptionsWhere<Package> = {};

      return this.packageRepo.find({
        where,
        take: limit,
        skip: offset,
        order: { [sortBy]: order },
      });
    }
    return this.packageRepo.find();
  }

  async findOne(id: number) {
    const packageData = await this.packageRepo.findOneBy({ id });
    if (!packageData) {
      throw new NotFoundException(`Package #${id} not found`);
    }
    return packageData;
  }

  async findByName(name: string) {
    return await this.packageRepo.findOne({ where: { name } });
  }

  async update(id: number, updatePackageDto: UpdatePackageDto) {
    const packageData = await this.packageRepo.findOneBy({ id });

    this.packageRepo.merge(packageData, updatePackageDto);

    return this.packageRepo.save(packageData);
  }

  remove(id: number) {
    return this.packageRepo.delete(id);
  }
}
