import { Injectable } from '@nestjs/common';
import { Polaroid } from '@prisma/client';
import { PolaroidResponseDto } from './dto/polaroid-response.dto';

@Injectable()
export class PolaroidMapper {
  toResponse(p: Polaroid): PolaroidResponseDto {
    return {
      id: p.id,
      imageUrl: 'http://localhost:3000' + p.imageUrl,
      backContent: p.backContent,
      keyNumber: p.keyNumber || null,
      position: p.position || null,
      isActive: p.isActive,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    };
  }
}
