import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateCommunityDto,
  FilterCommunityDto,
} from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { Community } from './entities/community.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';

@Injectable()
export class CommunitiesService {
  constructor(
    @InjectRepository(Community) private communityRepo: Repository<Community>,
  ) {}

  async create(createCommunityDto: CreateCommunityDto) {
    const newCommunity = this.communityRepo.create(createCommunityDto);

    return await this.communityRepo.save(newCommunity);
  }

  findAll(params?: FilterCommunityDto) {
    if (params) {
      const where: FindOptionsWhere<Community> = {};
      const { limit, offset, order, sortBy, search } = params;

      if (search) {
        where.name = ILike(`%${search}%`);
      }

      return this.communityRepo.find({
        where,
        take: limit,
        skip: offset,
        order: { [sortBy]: order },
      });
    }
    return this.communityRepo.find();
  }

  async findOne(id: number) {
    const community = await this.communityRepo.findOneBy({ id });
    if (!community) {
      throw new NotFoundException(`Community #${id} not found`);
    }
    return community;
  }

  async findByName(name: string) {
    return await this.communityRepo.findOne({ where: { name } });
  }

  async update(id: number, updateCommunityDto: UpdateCommunityDto) {
    const community = await this.communityRepo.findOneBy({ id });

    this.communityRepo.merge(community, updateCommunityDto);

    return this.communityRepo.save(community);
  }

  remove(id: number) {
    return this.communityRepo.delete(id);
  }
}
