import { GameRepository } from '../../../../../src/backend/services/database/repositories/game-repository';
import { createTransaction } from '../../../../../src/backend/services/database/repositories/knex-utils';
import { expect } from 'chai';

describe('GameRepository', () => {

  let gameRepository: GameRepository;

  beforeEach(async () => {
    gameRepository = new GameRepository(await createTransaction());
  });

  it.only('should be able to load a game with joins', async function () {
    const game = await gameRepository.getGameById('FIFA_22');

    expect(game).to.not.be.null;
    expect(game).to.not.be.undefined;
  });
});
