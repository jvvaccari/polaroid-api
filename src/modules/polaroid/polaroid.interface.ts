export interface PolaroidSchema {
  imageUrl: string;
  backContent: string;
  keyNumber: number;
  position: number | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
