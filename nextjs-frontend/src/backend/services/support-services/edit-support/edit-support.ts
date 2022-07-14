import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { SupportRepository } from '../../database/repositories/support-repository';
import { Knex } from 'knex';
import { ServiceResponse } from '../../common/contracts/service-response';

export async function editSupport(req: any, context: PerRequestContext): Promise<ServiceResponse<Partial<any>, any>> {
    const repository = new SupportRepository(context.transaction as Knex.Transaction);

    return {
        data: await repository.update(req)
    };
}
