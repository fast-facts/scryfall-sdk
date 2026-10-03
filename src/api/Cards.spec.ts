import * as Scry from '../Scry';
import { Card, ENDPOINT_FILE_1, RESOURCE_GENERIC_CARD_BACK, SymbologyTransformer } from '../Scry';
import MagicQuerier from '../util/MagicQuerier';

function imagePath(url?: string | null) {
  return url?.split('?')[0];
}

describe('Cards', () => {
  it('by id', async () => {
    const card = await Scry.Cards.byId('9ea8179a-d3c9-4cdc-a5b5-68cc73279050');
    expect(card.name).toBe('Blood Scrivener');
  });

  describe('by name,', () => {
    it('exact', async () => {
      const card = await Scry.Cards.byName('Blood Scrivener');
      expect(card.name).toBe('Blood Scrivener');
      await expect(Scry.Cards.byName('Bliid Scrivener')).rejects.toMatchObject({ status: 404 });
    });

    it('fuzzy', async () => {
      const card = await Scry.Cards.byName('Bliid Scrivener', true);
      expect(card?.name).toBe('Blood Scrivener');
      await expect(Scry.Cards.byName('rstdrdtst', true)).rejects.toMatchObject({ status: 404 });
    });

    it('with set filter', async () => {
      const card = await Scry.Cards.byName('Loxodon Warhammer', 'MRD');
      expect(card.name).toBe('Loxodon Warhammer');
      expect(card.set).toBe('mrd');
    });

    it('fuzzy with set filter', async () => {
      const card = await Scry.Cards.byName('Warhammer', 'MRD', true);
      expect(card?.name).toBe('Loxodon Warhammer');
      expect(card?.set).toBe('mrd');
    });
  });

  it('by set', async () => {
    const card = await Scry.Cards.bySet('dgm', 22);
    expect(card.name).toBe('Blood Scrivener');
  });

  it('by set - string collectorNumber', async () => {
    const card = await Scry.Cards.bySet('unf', '200a');
    expect(card.name).toBe('Balloon Stand');
  });

  it('by multiverse id', async () => {
    const card = await Scry.Cards.byMultiverseId(369030);
    expect(card.name).toBe('Blood Scrivener');
  });

  it('by mtgo id', async () => {
    const card = await Scry.Cards.byMtgoId(48338);
    expect(card.name).toBe('Blood Scrivener');
  });

  it('by arena id', async () => {
    const card = await Scry.Cards.byArenaId(67330);
    expect(card.name).toBe('Yargle, Glutton of Urborg');
  });

  it('by tcg player id', async () => {
    const card = await Scry.Cards.byTcgPlayerId(1030);
    expect(card.name).toBe('Ankh of Mishra');
  });

  it('by cardmarket id', async () => {
    const card = await Scry.Cards.byCardmarketId(681770);
    expect(card.name).toBe('Phyrexian Fleshgorger');
  });

  it('in lang', async () => {
    const card = await Scry.Cards.bySet('dom', 1, 'ja');
    expect(card.printed_name).toBe('ウルザの後継、カーン');
  });

  it('search', async () => {
    const results: Scry.Card[] = [];
    for await (const card of Scry.Cards.search('type:planeswalker').all()) {
      results.push(card);
      expect(card.type_line).toContain('Planeswalker');
    }

    expect(results.length).toBeGreaterThanOrEqual(97);
  });

  it('search without adding event listeners', async () => {
    await new Promise<void>(resolve => {
      Scry.Cards.search('is:commander legal:commander game:paper').on('end', resolve);
    });
  });

  it('search waitForAll', async () => {
    const matches = await Scry.Cards.search('!smoker').waitForAll();
    expect(matches).toHaveLength(0);
  });

  it('search by set', async () => {
    const results = await Scry.Cards.search('s:kld', { order: 'cmc' }).waitForAll();
    expect(results).toHaveLength(264);
    for (let i = 1; i < results.length; i++)
      expect(results[i].cmc).toBeGreaterThanOrEqual(results[i - 1].cmc);
    for (const card of results)
      expect(card.set).toBe('kld');
  });

  it('search type:creature (cancel after 427 cards)', async () => {
    let needCount = 427;
    const emitter = Scry.Cards.search('type:creature');
    await new Promise<void>((resolve, reject) => {
      emitter.on('data', () => {
        needCount--;
        if (needCount === 0)
          emitter.cancel();
      }).on('end', () => {
        reject(new Error('Did not expect to reach this point'));
      }).on('cancel', () => {
        expect(needCount).toBe(0);
        resolve();
      }).on('error', reject);
    });
  });

  it('should support pagination of searches', async () => {
    const firstPage = await Scry.Cards.search('type:creature').cancelAfterPage().waitForAll();
    const secondPage = await Scry.Cards.search('type:creature', 2).cancelAfterPage().waitForAll();
    expect(firstPage[0].id).not.toBe(secondPage[0].id);
  });

  it('random', async () => {
    const card = await Scry.Cards.random();
    expect(card.object).toBe('card');
    expect(card.name.length).toBeGreaterThan(0);
  });

  it('random with query', async () => {
    const card = await Scry.Cards.random('type:planeswalker');
    expect(card.object).toBe('card');
    expect(card.type_line).toContain('Planeswalker');
  });

  it('autocomplete name', async () => {
    const cardNames = await Scry.Cards.autoCompleteName('bloodsc');
    expect(cardNames).toContain('Blood Scrivener');
  });

  it('should allow cancelling after a single page of results', async () => {
    const result = await Scry.Cards.search('cmc>0').cancelAfterPage().waitForAll();
    expect(result).toHaveLength(175);
  });

  it('should return an empty array on an invalid search', async () => {
    const result = await Scry.Cards.search('cmc>cmc').cancelAfterPage().waitForAll();
    expect(result).toHaveLength(0);
  });

  describe('Collection', () => {
    it('by id', async () => {
      const cards = await Scry.Cards.collection(Scry.CardIdentifier.byId('94c70f23-0ca9-425e-a53a-6c09921c0075')).waitForAll();
      expect(cards).toHaveLength(1);
      expect(cards[0].name).toBe('Crush Dissent');
    });

    it('by multiverse id', async () => {
      const cards = await Scry.Cards.collection(Scry.CardIdentifier.byMultiverseId(462293)).waitForAll();
      expect(cards).toHaveLength(1);
      expect(cards[0].name).toBe('Contentious Plan');
    });

    it('by mtgo id', async () => {
      const cards = await Scry.Cards.collection(Scry.CardIdentifier.byMtgoId(71692)).waitForAll();
      expect(cards).toHaveLength(1);
      expect(cards[0].name).toBe('Bond of Insight');
    });

    it('by oracle id', async () => {
      const cards = await Scry.Cards.collection(Scry.CardIdentifier.byOracleId('394c6de5-7957-4a0b-a6b9-ee0c707cd022')).waitForAll();
      expect(cards).toHaveLength(1);
      expect(cards[0].name).toBe('Forgotten Cave');
    });

    it('by illustration id', async () => {
      const cards = await Scry.Cards.collection(Scry.CardIdentifier.byIllustrationId('99f43949-049e-41e2-bf4c-e22e11790012')).waitForAll();
      expect(cards).toHaveLength(1);
      expect(cards[0].name).toBe('GO TO JAIL');
    });

    it('by name', async () => {
      const cards = await Scry.Cards.collection(Scry.CardIdentifier.byName('Blood Scrivener')).waitForAll();
      expect(cards).toHaveLength(1);
      expect(cards[0].name).toBe('Blood Scrivener');
    });

    it('by name & set', async () => {
      const cards = await Scry.Cards.collection(Scry.CardIdentifier.byName('Lightning Bolt', 'prm')).waitForAll();
      expect(cards).toHaveLength(1);
      expect(cards[0].name).toBe('Lightning Bolt');
      expect(cards[0].set).toBe('prm');
    });

    it('by set', async () => {
      const cards = await Scry.Cards.collection(Scry.CardIdentifier.bySet('mrd', '150')).waitForAll();
      expect(cards).toHaveLength(1);
      expect(cards[0].name).toBe('Chalice of the Void');
    });

    it('by multiverse id, 100 cards', async () => {
      const cards = await Scry.Cards.collection(
        ...Array.from({ length: 100 }, (_, i) => Scry.CardIdentifier.byMultiverseId(i + 1)),
      ).waitForAll();
      expect(cards).toHaveLength(100);
      for (let i = 0; i < 100; i++)
        expect(cards[i].multiverse_ids).toContain(i + 1);
    });

    it('by id with invalid', async () => {
      const cards = await Scry.Cards.collection(
        Scry.CardIdentifier.byId('94c70f23-0ca9-425e-a53a-6c09921c0075'),
        Scry.CardIdentifier.byId('94c70f23-0ca9-425e-a53a-111111111111'),
      ).waitForAll();
      expect(cards).toHaveLength(1);
      expect(cards[0].name).toBe('Crush Dissent');
      expect(cards.not_found).toHaveLength(1);
      expect(cards.not_found[0].id).toBe('94c70f23-0ca9-425e-a53a-111111111111');
    });
  });

  describe('methods', () => {
    it('getSet', async () => {
      const card = await Scry.Cards.byId('9ea8179a-d3c9-4cdc-a5b5-68cc73279050');
      const set = await card.getSet();
      expect(set.code).toBe('dgm');
    });

    it('getRulings', async () => {
      const card = await Scry.Cards.byId('9ea8179a-d3c9-4cdc-a5b5-68cc73279050');
      const rulings = await card.getRulings();
      expect(rulings).toHaveLength(2);
    });

    it('getPrints', async () => {
      const card = await Scry.Cards.byId('1f0d2e8e-c8f2-4b31-a6ba-6283fc8740d4');
      MagicQuerier.requestCount = 0;

      let prints: Card[] = [];
      for (let i = 0; i < 5; i++) {
        prints = await card.getPrints();
        expect(prints.length).toBeGreaterThanOrEqual(7);
        for (const print of prints)
          expect(print.name).toBe('Chalice of the Void');
      }

      expect(MagicQuerier.requestCount).toBe(1);
      prints = await prints[0].getPrints();
      expect(prints.length).toBeGreaterThanOrEqual(7);
      for (const print of prints)
        expect(print.name).toBe('Chalice of the Void');
      expect(MagicQuerier.requestCount).toBe(1);
    });

    it('isLegal', async () => {
      let card = await Scry.Cards.byId('3462a3d0-5552-49fa-9eb7-100960c55891');
      expect(card.isLegal('legacy')).toBe(false);
      expect(card.isLegal('penny')).toBe(false);
      expect(card.isLegal('vintage')).toBe(true);
      card = await Scry.Cards.byId('8c39f9b4-02b9-4d44-b8d6-4fd02ebbb0c5');
      expect(card.isLegal('standard')).toBe(false);
      expect(card.isLegal('vintage')).toBe(true);
    });

    it('isIllegal', async () => {
      let card = await Scry.Cards.byId('3462a3d0-5552-49fa-9eb7-100960c55891');
      expect(card.isIllegal('legacy')).toBe(true);
      expect(card.isIllegal('penny')).toBe(true);
      expect(card.isIllegal('vintage')).toBe(false);
      card = await Scry.Cards.byId('8c39f9b4-02b9-4d44-b8d6-4fd02ebbb0c5');
      expect(card.isIllegal('standard')).toBe(true);
      expect(card.isIllegal('vintage')).toBe(false);
    });

    it('getText', async () => {
      const card = await Scry.Cards.byId('41bd76f3-299d-4bc0-a603-2cc7db7dac7b');
      Scry.Cards.setSymbologyTransformer(':mana-$1$2:');
      expect(card.getText()).toBe(':mana-1::mana-U:, :mana-T:: Target creature gains flying until end of turn.');
    });

    it('getCost', async () => {
      const map = new Map<Card, string>();
      map.set(await Scry.Cards.byId('41bd76f3-299d-4bc0-a603-2cc7db7dac7b'), ':mana-U:');
      map.set(await Scry.Cards.byId('3e7da55c-7f05-46b2-aa3c-17f8d5df46bb'), ':mana-12:');
      map.set(await Scry.Cards.byId('a3f64ad2-4041-421d-baa2-206cedcecf0e'), ':mana-1::mana-WB::mana-WB:');

      const transformers: (string | SymbologyTransformer)[] = [
        ':mana-$1$2:',
        (type1, type2) => `:mana-${type1}${type2}:`,
      ];
      for (const transformer of transformers) {
        Scry.Cards.setSymbologyTransformer(transformer);
        for (const [card, expected] of map)
          expect(card.getCost()).toBe(expected);
      }
    });

    it('getImageURI', async () => {
      let card = await Scry.Cards.byId('d2f3035c-ca27-40f3-ad73-c4e54bb2bcd7');
      expect(imagePath(card.getImageURI('normal'))).toBe(`${ENDPOINT_FILE_1}/normal/front/d/2/d2f3035c-ca27-40f3-ad73-c4e54bb2bcd7.jpg`);
      card = await Scry.Cards.byId('c4ac7570-e74e-4081-ac53-cf41e695b7eb');
      expect(imagePath(card.getImageURI('normal'))).toBe(`${ENDPOINT_FILE_1}/normal/front/c/4/c4ac7570-e74e-4081-ac53-cf41e695b7eb.jpg`);
    });

    it('getFrontImageURI', async () => {
      let card = await Scry.Cards.byId('d2f3035c-ca27-40f3-ad73-c4e54bb2bcd7');
      expect(imagePath(card.getFrontImageURI('normal'))).toBe(`${ENDPOINT_FILE_1}/normal/front/d/2/d2f3035c-ca27-40f3-ad73-c4e54bb2bcd7.jpg`);
      card = await Scry.Cards.byId('c4ac7570-e74e-4081-ac53-cf41e695b7eb');
      expect(imagePath(card.getFrontImageURI('normal'))).toBe(`${ENDPOINT_FILE_1}/normal/front/c/4/c4ac7570-e74e-4081-ac53-cf41e695b7eb.jpg`);
    });

    it('getBackImageURI', async () => {
      let card = await Scry.Cards.byId('d2f3035c-ca27-40f3-ad73-c4e54bb2bcd7');
      expect(card.getBackImageURI('normal')).toBe(RESOURCE_GENERIC_CARD_BACK);
      card = await Scry.Cards.byId('c4ac7570-e74e-4081-ac53-cf41e695b7eb');
      expect(imagePath(card.getBackImageURI('normal'))).toBe(`${ENDPOINT_FILE_1}/normal/back/c/4/c4ac7570-e74e-4081-ac53-cf41e695b7eb.jpg`);
    });

    describe('on faces', () => {
      it('getText', async () => {
        const card = await Scry.Cards.byId('d2f3035c-ca27-40f3-ad73-c4e54bb2bcd7');
        Scry.Cards.setSymbologyTransformer(':mana-$1$2:');
        expect(card.getText()).toBeUndefined();
        expect(card.card_faces).toHaveLength(2);
        expect(card.card_faces[0].getText()).toBe('Counter target spell unless its controller pays :mana-3:.');
        expect(card.card_faces[1].getText()).toBe('Aftermath (Cast this spell only from your graveyard. Then exile it.)\nUp to three target lands don\'t untap during their controller\'s next untap step.');
      });

      it('getCost', async () => {
        const card = await Scry.Cards.byId('d2f3035c-ca27-40f3-ad73-c4e54bb2bcd7');
        Scry.Cards.setSymbologyTransformer(':mana-$1$2:');
        expect(card.getCost()).toBe(':mana-2::mana-U: // :mana-2::mana-R:');
        expect(card.card_faces).toHaveLength(2);
        expect(card.card_faces[0].getCost()).toBe(':mana-2::mana-U:');
        expect(card.card_faces[1].getCost()).toBe(':mana-2::mana-R:');
      });

      it('getImageURI', async () => {
        let card = await Scry.Cards.byId('d2f3035c-ca27-40f3-ad73-c4e54bb2bcd7');
        expect(card.card_faces).toHaveLength(2);
        expect(imagePath(card.card_faces[0].getImageURI('normal'))).toBe(`${ENDPOINT_FILE_1}/normal/front/d/2/d2f3035c-ca27-40f3-ad73-c4e54bb2bcd7.jpg`);
        expect(imagePath(card.card_faces[1].getImageURI('normal'))).toBe(`${ENDPOINT_FILE_1}/normal/front/d/2/d2f3035c-ca27-40f3-ad73-c4e54bb2bcd7.jpg`);
        card = await Scry.Cards.byId('c4ac7570-e74e-4081-ac53-cf41e695b7eb');
        expect(card.card_faces).toHaveLength(2);
        expect(imagePath(card.card_faces[0].getImageURI('normal'))).toBe(`${ENDPOINT_FILE_1}/normal/front/c/4/c4ac7570-e74e-4081-ac53-cf41e695b7eb.jpg`);
        expect(imagePath(card.card_faces[1].getImageURI('normal'))).toBe(`${ENDPOINT_FILE_1}/normal/back/c/4/c4ac7570-e74e-4081-ac53-cf41e695b7eb.jpg`);
      });
    });

    describe('related cards', () => {
      it('get', async () => {
        const card = await Scry.Cards.byId('e634baa3-2cdd-412a-9407-c347fe46f9b8');
        const tokens = card.getTokens();
        expect(tokens.map(token => token.name)).toEqual(expect.arrayContaining(['Human Soldier', 'Dinosaur']));
        expect(tokens).toHaveLength(2);

        const tokenCards: Card[] = [];
        for (const token of tokens)
          tokenCards.push(await token.get());
        expect(tokenCards.map(tokenCard => tokenCard.oracle_text)).toEqual(expect.arrayContaining(['', 'Haste']));
        expect(tokenCards).toHaveLength(2);
      });
    });
  });
});
