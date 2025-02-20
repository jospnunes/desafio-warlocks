import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note, NoteDocument } from './schemas/note.schema';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  async createNote(
    userId: string,
    title: string,
    description: string,
  ): Promise<NoteDocument> {
    const newNote = new this.noteModel({ user: userId, title, description });
    return newNote.save();
  }

  async findAll(userId: string): Promise<NoteDocument[]> {
    return this.noteModel.find({ user: userId }).exec();
  }

  async updateNote(
    userId: string,
    noteId: string,
    title: string,
    description: string,
  ): Promise<NoteDocument> {
    const note = await this.noteModel.findOneAndUpdate(
      { _id: noteId, user: userId },
      { title, description },
      { new: true },
    );
    if (!note) {
      throw new NotFoundException('Nota não encontrada');
    }
    return note;
  }

  async deleteNote(
    userId: string,
    noteId: string,
  ): Promise<{ message: string }> {
    const note = await this.noteModel.findOneAndDelete({
      _id: noteId,
      user: userId,
    });
    if (!note) {
      throw new NotFoundException('Nota não encontrada');
    }
    return { message: 'Nota excluída com sucesso' };
  }
}
