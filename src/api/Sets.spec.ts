import * as Scry from '../Scry';

describe('Sets', () => {
  it.each([
    ['by code', () => Scry.Sets.byCode('hou')],
    ['by id', () => Scry.Sets.byId('65ff168b-bb94-47a5-a8f9-4ec6c213e768')],
    ['by tcg player id', () => Scry.Sets.byTcgPlayerId(1934)],
  ])('%s', async (_name, load) => {
    expect((await load()).name).toBe('Hour of Devastation');
  });

  it('all', async () => {
    const sets = await Scry.Sets.all();
    expect(sets.length).toBeGreaterThanOrEqual(394);
  });

  describe('byName', () => {
    it('exact', async () => {
      const result = await Scry.Sets.byName('hour of devastation');
      expect(result.name).toBe('Hour of Devastation');
      await expect(Scry.Sets.byName('hou')).rejects.toMatchObject({ status: 404 });
    });

    it('fuzzy', async () => {
      await expect(Scry.Sets.byName('hou', true)).rejects.toMatchObject({ status: 404 });
      Scry.clearCache();
      Scry.setFuzzySearch((search, targets) => search === 'hou' ? targets.find(set => set.code === 'hou') : undefined);
      try {
        const result = await Scry.Sets.byName('hou', true);
        expect(result.name).toBe('Hour of Devastation');
        await expect(Scry.Sets.byName('lskadjflaskdjfsladkfj', true)).rejects.toMatchObject({ status: 404 });
      } finally {
        Scry.setFuzzySearch();
      }
    });
  });

  describe('methods', () => {
    it('getCards', async () => {
      const set = await Scry.Sets.byCode('hou');
      const cards = await set.getCards();
      expect(cards).toHaveLength(199);
    });

    it('search', async () => {
      const set = await Scry.Sets.byCode('hou');
      const cards = await set.search('type:planeswalker');
      expect(cards).toHaveLength(4);
      for (const card of cards) {
        expect(
          card.type_line.startsWith('Legendary Planeswalker') || card.type_line.startsWith('Planeswalker'),
        ).toBe(true);
      }
    });
  });
});
