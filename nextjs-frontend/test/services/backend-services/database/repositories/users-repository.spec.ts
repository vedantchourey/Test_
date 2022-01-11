import { expect } from 'chai';
import { createTransaction } from '../../../../../backend/services/database/repositories/knex-utils';
import { createUsersRepository, UsersRepository } from '../../../../../backend/services/database/repositories/users-repository';

describe('users-repository', () => {
  let repository: UsersRepository;

  beforeEach(async () => {
    repository = createUsersRepository(await createTransaction());
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
