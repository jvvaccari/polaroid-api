import { randomUUID } from 'crypto';
import { PolaroidSchema } from './polaroid.interface';
import { Replace } from 'src/utils/replace';

export class Polaroid {
  props: PolaroidSchema;
  _id: string;

  constructor(
    props: Replace<
      PolaroidSchema,
      { createdAt?: Date; updatedAt?: Date; isActive?: boolean }
    >,
    id?: string,
  ) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
      isActive: props.isActive ?? true,
    };
    this._id = id ?? randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  get imageUrl(): string {
    return this.props.imageUrl;
  }

  get backContent(): string {
    return this.props.backContent;
  }

  get keyNumber(): number {
    return this.props.keyNumber;
  }

  get position(): number | null {
    return this.props.position;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
