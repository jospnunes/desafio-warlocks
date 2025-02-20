import { Expose } from 'class-transformer';

export class NoteResponseDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: string;
}
