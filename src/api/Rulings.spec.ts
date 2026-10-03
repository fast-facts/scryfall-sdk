import * as Scry from '../Scry';

describe('Rulings', () => {
  it.each([
    ['by id', () => Scry.Rulings.byId('9ea8179a-d3c9-4cdc-a5b5-68cc73279050'), 2],
    ['by set', () => Scry.Rulings.bySet('dgm', '22'), 2],
    ['by multiverse id', () => Scry.Rulings.byMultiverseId(369030), 2],
    ['by mtgo id', () => Scry.Rulings.byMtgoId(48338), 2],
    ['by arena id', () => Scry.Rulings.byArenaId(67204), 3],
  ])('%s', async (_name, load, min) => {
    expect((await load()).length).toBeGreaterThanOrEqual(min);
  });
});
