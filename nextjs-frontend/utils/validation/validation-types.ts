export type ValidationResult<Type> = {
  [Property in keyof Partial<Type>]: string | undefined;
};

export function isThereAnyError<T, TKey extends keyof ValidationResult<T>>(result: ValidationResult<T>) {
  const keys = Object.keys(result) as TKey[];
  return keys.some(x => result[x] != null);
}
