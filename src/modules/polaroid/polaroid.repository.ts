import { Injectable } from '@nestjs/common';
import { Polaroid, Prisma } from '@prisma/client';
import { IRepository } from 'src/common/interface.repository';
import { PrismaRepository } from 'src/prisma/prisma.repository';

@Injectable()
export class PolaroidRepository
  implements
    IRepository<
      Polaroid,
      string,
      Prisma.PolaroidCreateInput,
      Prisma.PolaroidUpdateInput
    >
{
  constructor(
    protected readonly inner: PrismaRepository<
      Polaroid,
      Prisma.PolaroidWhereUniqueInput,
      Prisma.PolaroidCreateInput,
      Prisma.PolaroidUpdateInput
    >,
  ) {}

  async findAll(): Promise<Polaroid[]> {
    return this.inner.findAll();
  }

  async findOne(id: string): Promise<Polaroid | null> {
    return this.inner.findOne({ id });
  }

  async create(data: Prisma.PolaroidCreateInput): Promise<Polaroid> {
    return this.inner.create(data);
  }

  async update(
    id: string,
    data: Prisma.PolaroidUpdateInput,
  ): Promise<Polaroid> {
    return this.inner.update({ id }, data);
  }

  async delete(id: string): Promise<Polaroid> {
    return this.inner.delete({ id });
  }
}
