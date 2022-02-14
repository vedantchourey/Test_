import { ParamType } from './param-type';

export interface ParamConfig<T> {
  isOptional?: boolean;
  type: ParamType<T>
}
