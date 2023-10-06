import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, FilterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepo.create(createUserDto);

    return await this.userRepo.save(newUser);
  }

  findAll(params?: FilterUserDto) {
    if (params) {
      const { limit, offset, order, sortBy, search } = params;

      const where: FindOptionsWhere<User> = {};

      if (search) {
        where.name = ILike(`%${search}%`);
      }

      return this.userRepo.find({
        where,
        take: limit,
        skip: offset,
        order: { [sortBy]: order },
      });
    }
    return this.userRepo.find();
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOneBy({ id });

    this.userRepo.merge(user, updateUserDto);

    return this.userRepo.save(user);
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }
}
