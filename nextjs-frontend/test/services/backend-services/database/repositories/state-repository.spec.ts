import { createStateRepository, StateRepository } from '../../../../../services/backend-services/database/repositories/state-repository';
import { createTransaction } from '../../../../../services/backend-services/database/repositories/knex-utils';
import { expect } from 'chai';

describe('StateRepository', () => {

  let repository: StateRepository;

  beforeEach(async () => {
    repository = createStateRepository(await createTransaction());
  });


  it('finds state by id ', async () => {
    const state = await repository.getStateById(12, 1);

    expect(state).to.exist;
    expect(state?.id).to.equal(12);
  });

});
