import * as Scry from '../Scry';

describe('Symbology', () => {
  it('all', async () => {
    const symbology = await Scry.Symbology.all();
    expect(symbology.length).toBeGreaterThanOrEqual(63);
  });

  it('parse mana cost', async () => {
    const manacost = await Scry.Symbology.parseMana('2ww');
    expect(manacost.cost).toBe('{2}{W}{W}');
  });
});
