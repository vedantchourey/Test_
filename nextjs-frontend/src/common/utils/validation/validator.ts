import validator from 'validator';

export type ValidationResult<Type> = {
  // eslint-disable-next-line no-unused-vars
  [Property in keyof Partial<Type>]: string | undefined;
};


export function isThereAnyError<T, TKey extends keyof ValidationResult<T>>(result: ValidationResult<T>) {
  const keys = Object.keys(result) as TKey[];
  return keys.some((x) => result[x] != null);
}

// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export function getErrorForProp<T, TKey extends keyof ValidationResult<T>>(result: ValidationResult<T>, prop: keyof T) {
  return result[prop];
}

// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export function propsHasError<T, TKey extends keyof ValidationResult<T>>(result: ValidationResult<T>, prop: keyof T) {
  return result[prop] != null;
}

export function isNullOrEmptyString(value: string | undefined | null) {
  if (value == null) return true;
  return validator.isEmpty(value);
}
