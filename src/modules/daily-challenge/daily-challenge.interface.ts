import { PolaroidSchema } from '../polaroid/polaroid.interface';

export interface DailyChallengeSchema {
  date: Date;
  polaroidId: string;
  polaroidData?: PolaroidSchema;
  isCompleted: boolean;
  completedAt: Date | null;
  attempts: number;
  createdAt: Date;
  updatedAt: Date;
}
