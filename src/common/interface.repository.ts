export interface IRepository<Model, Where, CreateData, UpdateData> {
  findAll(): Promise<Model[]>;
  findOne(where: Where): Promise<Model | null>;
  create(data: CreateData): Promise<Model>;
  update(where: Where, data: UpdateData): Promise<Model>;
  delete(where: Where): Promise<Model>;
}
