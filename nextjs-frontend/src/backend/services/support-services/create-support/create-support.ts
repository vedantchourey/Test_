import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { SupportRepository } from '../../database/repositories/support-repository';
import { validatePost } from './create-support-validator';
import { isThereAnyError } from '../../../../common/utils/validation/validator';
import { Knex } from 'knex';
import { ServiceResponse } from '../../common/contracts/service-response';

export async function createTicket(req: any, context: PerRequestContext): Promise<ServiceResponse<Partial<any>, any>> {
  const errors = await validatePost(req);
  if (isThereAnyError(errors)) return {errors: errors}
  const repository = new SupportRepository(context.transaction as Knex.Transaction);

  const getLastId: any = await repository.lastId()
  
  const ticketId = await repository.createTicket({
      id: new Date().getFullYear()+'-'+(getLastId ? (parseInt(getLastId?.id.split("-")[1])+1) : 1 ),
      message: req.message,
      type: req.type,
      subject: req.subject,
      user_id: context.user?.id
  });

  const createdPost = await repository.getNewsUsingId(ticketId as string);
  const { id, createdAt, message, type, subject, status } = createdPost as any;
  
  return {
    data: {
      id,
      message,
      type,
      subject,
      status,
      createdAt: createdAt?.toISOString() as string
    } as unknown as any
  }
}
