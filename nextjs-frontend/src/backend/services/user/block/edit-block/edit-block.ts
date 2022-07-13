import { PerRequestContext } from '../../../../utils/api-middle-ware/api-middleware-typings';
import { ProfilesRepository } from '../../../database/repositories/profiles-repository';
import { validatePost } from './edit-block-validator';
import { isThereAnyError } from '../../../../../common/utils/validation/validator';
import { Knex } from 'knex';
import { ServiceResponse } from '../../../common/contracts/service-response';

export async function block(req: any, context: PerRequestContext): Promise<ServiceResponse<Partial<any>, any>> {
    const errors = await validatePost(req);
    if (isThereAnyError(errors)) return {errors: errors}
    const repository = new ProfilesRepository(context.transaction as Knex.Transaction);

    return {
        data: await repository.block(req.user_id, req.value)
    };
}
