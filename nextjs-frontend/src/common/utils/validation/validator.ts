import validator from 'validator';

export type ValidationResult<Type> = {
  [Property in keyof Partial<Type>]: string | undefined;
};


export function isThereAnyError<T, TKey extends keyof ValidationResult<T>>(result: ValidationResult<T>) {
  const keys = Object.keys(result) as TKey[];
  return keys.some(x => result[x] != null);
}

export function getErrorForProp<T, TKey extends keyof ValidationResult<T>>(result: ValidationResult<T>, prop: keyof T) {
  return result[prop];
}

export function propsHasError<T, TKey extends keyof ValidationResult<T>>(result: ValidationResult<T>, prop: keyof T) {
  return result[prop] != null;
}

export function isNullOrEmptyString(value: string | undefined | null) {
  if (value == null) return true;
  return validator.isEmpty(value);
}

export function isObject(val: any): boolean {
  return val instanceof Object;
}

export function isObjectHasProperty(obj: object, property: string) {
  if (isObject(obj)) {
    return obj.hasOwnProperty(property);
  }

  return false;
}

export function isUrl(value: string | undefined | null) {
  if (value === null || value === undefined) return false;
  return validator.isURL(value);
}

export function isUUID(value: string | undefined | null) {
  if (value === null || value === undefined) return false;
  return validator.isUUID(value);
}