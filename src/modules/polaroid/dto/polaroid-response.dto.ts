import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PolaroidResponseDto {
  @ApiProperty({ description: 'ID do polaroid' })
  id: string;

  @ApiProperty({ description: 'Título do polaroid' })
  title: string;

  @ApiPropertyOptional({ description: 'Descrição do polaroid' })
  description?: string;

  @ApiProperty({ description: 'URL da imagem' })
  imageUrl: string;

  @ApiPropertyOptional({ description: 'Data em que a foto foi tirada' })
  takenAt?: Date;

  @ApiProperty({ description: 'Data de criação' })
  createdAt: Date;

  @ApiProperty({ description: 'Data de atualização' })
  updatedAt: Date;

  constructor(partial: Partial<PolaroidResponseDto>) {
    Object.assign(this, partial);
  }
}
