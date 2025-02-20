import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { NotesService } from './notes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NoteResponseDto } from './dto/note-response.dto';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Notes')
@ApiBearerAuth()
@Controller('notes')
@UseGuards(JwtAuthGuard)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova nota' })
  async create(
    @Body() createNoteDto: CreateNoteDto,
    @GetUser('userId') userId: string,
  ): Promise<NoteResponseDto> {
    const note = await this.notesService.createNote(
      userId,
      createNoteDto.title,
      createNoteDto.description,
    );
    return plainToInstance(NoteResponseDto, note.toJSON());
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as notas do usuário' })
  async findAll(@GetUser('userId') userId: string): Promise<NoteResponseDto[]> {
    const notes = await this.notesService.findAll(userId);
    return notes.map((note) => plainToInstance(NoteResponseDto, note.toJSON()));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza uma nota' })
  async update(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @GetUser('userId') userId: string,
  ): Promise<NoteResponseDto> {
    const note = await this.notesService.updateNote(
      userId,
      id,
      updateNoteDto.title,
      updateNoteDto.description,
    );
    return plainToInstance(NoteResponseDto, note.toJSON());
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exclui uma nota' })
  async delete(
    @Param('id') id: string,
    @GetUser('userId') userId: string,
  ): Promise<{ message: string }> {
    return this.notesService.deleteNote(userId, id);
  }
}
