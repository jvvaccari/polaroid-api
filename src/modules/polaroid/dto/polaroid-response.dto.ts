import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt } from 'class-validator';

export class PolaroidResponseDto {
  @ApiProperty({ description: 'ID do polaroid' })
  id: string;

  @ApiProperty({ description: 'URL da imagem' })
  imageUrl: string;

  @ApiProperty({ description: 'Conteúdo do verso do polaroid' })
  backContent: string;

  @ApiProperty({
    description: 'Número chave do polaroid',
    example: 123,
  })
  @IsInt()
  keyNumber: number | null;

  @ApiProperty({
    description: 'Posição do polaroid',
    example: 1,
  })
  @IsInt()
  position: number | null;

  @ApiProperty({
    description: 'Se o polaroid está ativo',
    default: true,
    example: true,
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ description: 'Data de criação' })
  createdAt: Date;

  @ApiProperty({ description: 'Data de atualização' })
  updatedAt: Date;

  constructor(partial: Partial<PolaroidResponseDto>) {
    Object.assign(this, partial);
  }
}
