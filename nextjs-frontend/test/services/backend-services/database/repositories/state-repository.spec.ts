import { createStateRepository, StateRepository } from '../../../../../services/backend-services/database/repositories/state-repository';
import { createTransaction } from '../../../../../services/backend-services/database/repositories/knex-utils';
import { expect } from 'chai';

describe('StateRepository', () => {

  let repository: StateRepository;

  beforeEach(async () => {
    repository = createStateRepository(await createTransaction());
  });


  it('finds state by id ', async () => {
    const state = await repository.getStateById('87b1bc4a-1fd5-48c9-8c08-ccf79f95ba6a', 'b8fd0e37-609d-415d-8eb8-ce588693e3af');

    expect(state).to.exist;
    expect(state?.id).to.equal('87b1bc4a-1fd5-48c9-8c08-ccf79f95ba6a');
  });

});
