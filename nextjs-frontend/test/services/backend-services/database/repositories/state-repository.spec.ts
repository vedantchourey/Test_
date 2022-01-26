import { expect } from 'chai';
import { createStateRepository, StateRepository } from '../../../../../src/backend/services/database/repositories/state-repository';
import { createKnexConnection } from '../../../../../src/backend/services/database/knex';

describe('StateRepository', () => {

  let repository: StateRepository;

  beforeEach(async () => {
    const knex = createKnexConnection();
    repository = createStateRepository(await knex.transaction());
  });


  it('finds state by id ', async () => {
    const state = await repository.getStateById('87b1bc4a-1fd5-48c9-8c08-ccf79f95ba6a', 'b8fd0e37-609d-415d-8eb8-ce588693e3af');

    expect(state).to.exist;
    expect(state?.id).to.equal('87b1bc4a-1fd5-48c9-8c08-ccf79f95ba6a');
  });

});
