import * as Scry from '../Scry';

describe('Rulings', () => {
  it('by id', async () => {
    const rulings = await Scry.Rulings.byId('9ea8179a-d3c9-4cdc-a5b5-68cc73279050');
    expect(rulings.length).toBeGreaterThanOrEqual(2);
  });

  it('by set', async () => {
    const rulings = await Scry.Rulings.bySet('dgm', '22');
    expect(rulings.length).toBeGreaterThanOrEqual(2);
  });

  it('by multiverse id', async () => {
    const rulings = await Scry.Rulings.byMultiverseId(369030);
    expect(rulings.length).toBeGreaterThanOrEqual(2);
  });

  it('by mtgo id', async () => {
    const rulings = await Scry.Rulings.byMtgoId(48338);
    expect(rulings.length).toBeGreaterThanOrEqual(2);
  });

  it('by arena id', async () => {
    const rulings = await Scry.Rulings.byArenaId(67204);
    expect(rulings.length).toBeGreaterThanOrEqual(3);
  });
});
