export type Validator<Type> = {
  [Property in keyof Type]: (value: Type[Property], obj: Type, context: Map<string, any>) => string | undefined;
};

export type AsyncValidator<Type> = {
  [Property in keyof Type]: (value: Type[Property], obj: Type, context: Map<string, any>) => Promise<string | undefined>;
};

export type ValidationResult<Type> = {
  [Property in keyof Type]: string | undefined;
};


export function isThereAnyError<T, TKey extends keyof ValidationResult<T>>(result: ValidationResult<T>) {
  const keys = Object.keys(result) as TKey[];
  return keys.some(x => result[x] != null);
}
