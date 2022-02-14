import validator from 'validator';

export type ValidationResult<Type> = {
  // eslint-disable-next-line no-unused-vars
  [Property in keyof Partial<Type>]: string | undefined;
};


export function isThereAnyError<T, TKey extends keyof ValidationResult<T>>(result: ValidationResult<T>): boolean {
  const keys = Object.keys(result) as TKey[];
  return keys.some((x) => result[x] != null);
}

export function convertToJoinedMessage<T, TKey extends keyof ValidationResult<T>>(result: ValidationResult<T>): string {
  const keys = Object.keys(result) as TKey[];
  return keys.filter((Key) => result[Key] != null)
    .map((key) => `${key}: ${result[key]}`)
    .join(', ');
}

export function getErrorForProp<T>(result: ValidationResult<T>, prop: keyof T): string | undefined {
  return result[prop];
}

export function propsHasError<T>(result: ValidationResult<T>, prop: keyof T): boolean {
  return result[prop] != null;
}

export function isNullOrEmptyString(value: string | undefined | null): boolean {
  if (value == null) return true;
  return validator.isEmpty(value);
}

export function isUrl(value: string | undefined | null): boolean {
  if (value === null || value === undefined) return false;
  return validator.isURL(value);
}

export function isUUID(value: string | undefined | null): boolean {
  if (value === null || value === undefined) return false;
  return validator.isUUID(value);
}
