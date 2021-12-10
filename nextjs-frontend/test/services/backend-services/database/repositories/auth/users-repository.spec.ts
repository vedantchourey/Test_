import { countUsersByUserName } from '../../../../../../services/backend-services/database/repositories/auth/users-repository';
import { expect } from 'chai';

describe('users-repository', () => {
  it('should be able to get the count of users with matching email', function () {
    const count = countUsersByUserName('babymechanic@gmail.com');
    expect(count).to.equal(1);
  });
});
