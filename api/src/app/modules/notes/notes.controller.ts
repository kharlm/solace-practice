import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { NotesService } from './notes.service';

// Nested under users: notes only exist in the context of a user.
@Controller('users/:userId/notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  findForUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.notesService.findForUser(userId);
  }

  @Post()
  create(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() dto: CreateNoteDto,
  ) {
    return this.notesService.create(userId, dto);
  }
}
