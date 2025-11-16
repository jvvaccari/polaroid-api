import { PartialType } from '@nestjs/mapped-types';
import { CreatePolaroidDto } from './create-polaroid.dto';

export class UpdatePolaroidDto extends PartialType(CreatePolaroidDto) {}
