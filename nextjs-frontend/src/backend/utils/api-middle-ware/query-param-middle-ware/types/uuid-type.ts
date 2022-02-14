import validator from 'validator';
import { ParamType } from '../param-type';

export const uuidType: ParamType<string> = {
  validate(value: string | string[]) {
    if (value == null) return;
    if (typeof value !== 'string' || !validator.isUUID(value)) return 'expected uuid';
  },
  parse(value: string | string[]): string {
    if (uuidType.validate(value) != null) throw new Error('cannot parse invalid value');
    return value as string;
  }
};
