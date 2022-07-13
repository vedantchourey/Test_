import { PerRequestContext } from '../../../../utils/api-middle-ware/api-middleware-typings';
import { ProfilesRepository } from '../../../database/repositories/profiles-repository';
import { validatePost } from './suspend-validator';
import { isThereAnyError } from '../../../../../common/utils/validation/validator';
import { Knex } from 'knex';
import { ServiceResponse } from '../../../common/contracts/service-response';

export async function suspend(req: any, context: PerRequestContext): Promise<ServiceResponse<Partial<any>, any>> {
    const errors = await validatePost(req);
    if (isThereAnyError(errors)) return {errors: errors}
    const repository = new ProfilesRepository(context.transaction as Knex.Transaction);

    const thismonth = new Date();
    thismonth.setDate(thismonth.getDate() + 90);
    thismonth.setHours(0, 0, 0, 0);    
    return {
        data: await repository.suspend(req.user_id, thismonth)
    };
}
