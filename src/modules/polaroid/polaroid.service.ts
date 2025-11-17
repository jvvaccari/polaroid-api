import { Injectable, Inject } from '@nestjs/common';
import { Polaroid, Prisma } from '@prisma/client';
import type { IRepository } from 'src/common/interface.repository';
import { CreatePolaroidDto } from './dto/create-polaroid.dto';
import { UpdatePolaroidDto } from './dto/update-polaroid.dto';
import { ObjectId } from 'bson';
import { PolaroidMapper } from './polaroid.mapper';

@Injectable()
export class PolaroidService {
  constructor(
    @Inject('IRepository')
    private readonly polaroidRepository: IRepository<
      Polaroid,
      string,
      Prisma.PolaroidCreateInput,
      Prisma.PolaroidUpdateInput
    >,
    private readonly mapper: PolaroidMapper,
  ) {}

  async findAll(): Promise<Polaroid[]> {
    return this.polaroidRepository.findAll();
  }

  async findOne(id: string): Promise<Polaroid | null> {
    const found = await this.polaroidRepository.findOne(id);
    if (!found) {
      return null;
    }
    return this.mapper.toResponse(found);
  }

  async create(dto: CreatePolaroidDto, imageUrl: string): Promise<Polaroid> {
    const data: Prisma.PolaroidCreateInput = {
      id: new ObjectId().toString(),
      position: (await this.polaroidRepository.count()) + 1,
      isActive: true,
      backContent: dto.backContent,
      keyNumber: dto.keyNumber,
      imageUrl,
    };
    return this.polaroidRepository.create(data);
  }

  async update(id: string, dto: UpdatePolaroidDto): Promise<Polaroid> {
    const data: Prisma.PolaroidUpdateInput = { ...dto };
    return this.polaroidRepository.update(id, data);
  }

  async delete(id: string): Promise<Polaroid> {
    return this.polaroidRepository.delete(id);
  }
}
