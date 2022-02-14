import { ParamType } from '../param-type';

export const stringType: ParamType<string> = {
  validate(value: string | string[]) {
    if (value == null) return;
    if (typeof value !== 'string') return 'expected string';
  },
  parse(value: string | string[]): string {
    if (stringType.validate(value) != null) throw new Error('cannot parse invalid value');
    return value as string;
  }
};
