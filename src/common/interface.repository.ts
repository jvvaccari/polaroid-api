export interface IRepository<Model, Where, CreateData, UpdateData> {
  findAll(): Promise<Model[]>;
  findOne(where: Where): Promise<Model | null>;
  create(data: CreateData): Promise<Model>;
  update(where: Where, data: UpdateData): Promise<Model>;
  delete(where: Where): Promise<Model>;
  findByDate?(startDate: string, endDate: string): Promise<Model | null>;
  findFirst?(where: Where): Promise<Model | null>;
  count?(): Promise<number>;
}
