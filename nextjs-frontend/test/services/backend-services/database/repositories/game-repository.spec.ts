import { GameRepository } from '../../../../../src/backend/services/database/repositories/game-repository';
import { expect } from 'chai';
import { createKnexConnection } from '../../../../../src/backend/services/database/knex';

describe('GameRepository', () => {

  let gameRepository: GameRepository;

  beforeEach(async () => {
    const knex = createKnexConnection();
    gameRepository = new GameRepository(await knex.transaction());
  });

  it.only('should be able to load a game with joins', async function () {
    const game = await gameRepository.getGameById('FIFA_22');

    expect(game).to.not.be.null;
    expect(game).to.not.be.undefined;
  });
});
