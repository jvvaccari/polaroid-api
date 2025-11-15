export type Replace<OriginalType, ReplacementType> = Omit<
  OriginalType,
  keyof ReplacementType
> &
  ReplacementType;
