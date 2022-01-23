import { BaseRepository } from './base-repository';
import { Knex } from 'knex';
import { NoobUserRole } from '../../../utils/api-middle-ware/noob-user-role';

interface IUserRole {
  id: string;
  code: NoobUserRole;
  userId: string;
}

export class UserRoleRepository extends BaseRepository<IUserRole> {
  constructor(transaction: Knex.Transaction) {
    super(transaction, 'user_roles');
  }

  async getRolesByUserId(userId: string): Promise<IUserRole[]> {
    return this.entities()
               .select('id')
               .select('userId')
               .select('code')
               .where({userId: userId});
  }
}

