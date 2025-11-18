import { Injectable } from '@nestjs/common';
import { Polaroid } from '@prisma/client';
import { PolaroidResponseDto } from './dto/polaroid-response.dto';
import dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class PolaroidMapper {
  toResponse(p: Polaroid): PolaroidResponseDto {
    return {
      id: p.id,
      imageUrl: `http://localhost:${process.env.PORT}` + p.imageUrl,
      backContent: p.backContent,
      keyNumber: p.keyNumber,
      position: p.position,
      isActive: p.isActive,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    };
  }
}
