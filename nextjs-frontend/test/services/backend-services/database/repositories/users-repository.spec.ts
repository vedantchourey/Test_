import { expect } from 'chai';
import { createUsersRepository, UsersRepository } from '../../../../../src/backend/services/database/repositories/users-repository';
import { createKnexConnection } from '../../../../../src/backend/services/database/knex';

describe('users-repository', () => {
  let repository: UsersRepository;

  beforeEach(async () => {
    const knex = createKnexConnection();
    repository = createUsersRepository(await knex.transaction());
  });

  it('gets counts of users matching email', async function () {
    const count = await repository.countUsersByEmail('babymechanic@gmail.com');

    expect(count).to.equal(1);
  });

  it('gets count of users matching name', async function () {
    const count = await repository.countUsersByUserName('babymechanic@gmail.com');

    expect(count).to.equal(0);
  });
});
