import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNoteDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Título da nota' })
  title?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Descrição da nota' })
  description?: string;
}
