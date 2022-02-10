import { NextApiRequest, NextApiResponse } from 'next';
import { NoobApiRouteHandler, PerRequestContext } from '../api-middleware-typings';
import { convertToJoinedMessage, isThereAnyError, ValidationResult } from '../../../../common/utils/validation/validator';
import { ParamConfig } from './param-config';

interface Opts {
  params: { [i: string]: ParamConfig<unknown> };
  validate?(params: { [p: string]: string | string[] }, context: PerRequestContext): Promise<string | undefined>;
}


export const createQueryParamsMiddleWare = (opts: Opts): NoobApiRouteHandler => {
  return async (req: NextApiRequest, res: NextApiResponse, context: PerRequestContext): Promise<unknown> => {
    if (context.middlewareResponse != null) return;
    const params = opts.params;
    type OptParams = typeof params;
    const expectedKeys = Object.keys(params);

    const errors = {} as ValidationResult<OptParams>;
    expectedKeys.forEach((expectedKey) => {
      const paramConfig = params[expectedKey];
      if (paramConfig.isOptional && context.param[expectedKey] == null) return;
      const validationResult = paramConfig.type.validate(context.param[expectedKey]);
      if (validationResult != null) errors[expectedKey] = validationResult;
    })
    if (isThereAnyError(errors)) {
      console.warn(convertToJoinedMessage(errors));
      context.middlewareResponse = {status: 404, data: {message: 'not found'}}
      return;
    }
    const complexValidationError = opts.validate == null ? null : await opts.validate(context.param, context);
    if (complexValidationError != null) {
      console.warn(complexValidationError);
      context.middlewareResponse = {status: 404, data: {message: 'not found'}}
      return;
    }
    context.setQueryParamType(params);
  }
}
