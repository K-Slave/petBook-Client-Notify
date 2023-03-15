export const parseDateString = (s: string) => {
  return new Date(Date.parse(s));
};

export const isValidDate = (value: Date) => {
  return value instanceof Date && !isNaN(value as any);
};
