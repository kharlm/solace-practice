import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note) private readonly notes: Repository<Note>,
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async findForUser(userId: number) {
    await this.ensureUserExists(userId);
    return this.notes.find({ where: { userId }, order: { id: 'ASC' } });
  }

  async create(userId: number, dto: CreateNoteDto) {
    await this.ensureUserExists(userId);
    return this.notes.save(this.notes.create({ ...dto, userId }));
  }

  private async ensureUserExists(userId: number) {
    const exists = await this.users.existsBy({ id: userId });
    if (!exists) throw new NotFoundException(`User ${userId} not found`);
  }
}
