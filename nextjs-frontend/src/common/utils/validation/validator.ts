import validator from 'validator';

export type ValidationResult<Type> = {
  // eslint-disable-next-line no-unused-vars
  [Property in keyof Partial<Type>]: string | undefined;
};


export function isThereAnyError<T, TKey extends keyof ValidationResult<T>>(result: ValidationResult<T>) {
  const keys = Object.keys(result) as TKey[];
  return keys.some((x) => result[x] != null);
}

export function convertToJoinedMessage<T, TKey extends keyof ValidationResult<T>>(result: ValidationResult<T>) {
  const keys = Object.keys(result) as TKey[];
  return keys.filter((Key) => result[Key] != null)
             .map((key) => `${key}: ${result[key]}`)
             .join(', ');
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isObject(val: any): boolean {
  return val instanceof Object;
}

export function isObjectHasProperty(obj: object, property: string) {
  if (isObject(obj)) {
    // eslint-disable-next-line no-prototype-builtins
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
