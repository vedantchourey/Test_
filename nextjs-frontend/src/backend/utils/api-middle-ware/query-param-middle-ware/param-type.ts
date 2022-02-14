export interface ParamType<T> {
  validate(value: string | string[]): string | undefined;

  parse(value: string | string[]): T;
}
