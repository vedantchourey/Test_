import { countUsersByEmail, countUsersByUserName } from '../../../../../../services/backend-services/database/repositories/users-repository';
import { expect } from 'chai';

describe('users-repository', () => {
  it('should be able to get the count of users with matching email', async function () {
    const count = await countUsersByEmail('babymechanic@gmail.com');

    expect(count).to.equal(1);
  });

  it('should be able to get the count of users with matching email', async function () {
    const count = await countUsersByUserName('babymechanic@gmail.com');

    expect(count).to.equal(0);
  });
});
