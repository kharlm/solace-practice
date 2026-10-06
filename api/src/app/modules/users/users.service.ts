import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserType } from './entities/user.entity';

const UNIQUE_VIOLATION = '23505';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly users: Repository<User>) {}

  findAll(type?: UserType) {
    return this.users.find({
      where: type ? { type } : undefined,
      order: { id: 'ASC' },
    });
  }

  async count() {
    return { count: await this.users.count() };
  }

  async findOne(id: number) {
    const user = await this.users.findOneBy({ id });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }

  async create(dto: CreateUserDto) {
    return this.save(this.users.create(dto));
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.findOne(id);
    return this.save(this.users.merge(user, dto));
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.users.remove(user);
  }

  private async save(user: User) {
    try {
      return await this.users.save(user);
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError?.code === UNIQUE_VIOLATION) {
        throw new ConflictException('Email is already in use');
      }
      throw error;
    }
  }
}
