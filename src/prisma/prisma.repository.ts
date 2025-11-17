import { IRepository } from 'src/common/interface.repository';

export interface PrismaModelDelegate<
  Model,
  WhereUnique,
  CreateData,
  UpdateData,
> {
  findMany?(): Promise<Model[]>;
  findUnique(args: { where: WhereUnique }): Promise<Model | null>;
  create(args: { data: CreateData }): Promise<Model>;
  update(args: { where: WhereUnique; data: UpdateData }): Promise<Model>;
  delete(args: { where: WhereUnique }): Promise<Model>;
  count(): Promise<number>;
}

export class PrismaRepository<Model, WhereUnique, CreateData, UpdateData>
  implements IRepository<Model, WhereUnique, CreateData, UpdateData>
{
  constructor(
    private readonly delegate: PrismaModelDelegate<
      Model,
      WhereUnique,
      CreateData,
      UpdateData
    >,
  ) {}

  findAll(): Promise<Model[]> {
    if (!this.delegate.findMany) {
      throw new Error('findMany method is not implemented in the delegate');
    }
    return this.delegate.findMany();
  }

  findOne(where: WhereUnique): Promise<Model | null> {
    return this.delegate.findUnique({ where });
  }

  create(data: CreateData): Promise<Model> {
    return this.delegate.create({ data });
  }

  update(where: WhereUnique, data: UpdateData): Promise<Model> {
    return this.delegate.update({ where, data });
  }

  delete(where: WhereUnique): Promise<Model> {
    return this.delegate.delete({ where });
  }

  count(): Promise<number> {
    return this.delegate.count();
  }
}
