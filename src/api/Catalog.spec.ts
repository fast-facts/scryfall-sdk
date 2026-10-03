import * as Scry from '../Scry';

const atLeast = (min: number) => (rows: string[]) => expect(rows.length).toBeGreaterThanOrEqual(min);

describe('Catalog', () => {
  it.each([
    ['card names', () => Scry.Catalog.cardNames(), atLeast(18059)],
    ['artist names', () => Scry.Catalog.artistNames(), atLeast(676)],
    ['word bank', () => Scry.Catalog.wordBank(), atLeast(12892)],
    ['creature types', () => Scry.Catalog.creatureTypes(), atLeast(242)],
    ['planeswalker types', () => Scry.Catalog.planeswalkerTypes(), atLeast(42)],
    ['land types', () => Scry.Catalog.landTypes(), atLeast(13)],
    ['artifact types', () => Scry.Catalog.artifactTypes(), atLeast(6)],
    ['enchantment types', () => Scry.Catalog.enchantmentTypes(), atLeast(5)],
    ['spell types', () => Scry.Catalog.spellTypes(), atLeast(2)],
    ['powers', () => Scry.Catalog.powers(), atLeast(33)],
    ['toughnesses', () => Scry.Catalog.toughnesses(), atLeast(35)],
    ['loyalties', () => Scry.Catalog.loyalties(), atLeast(9)],
    ['watermarks', () => Scry.Catalog.watermarks(), atLeast(50)],
    ['keyword abilities', () => Scry.Catalog.keywordAbilities(), atLeast(176)],
    ['keyword actions', () => Scry.Catalog.keywordActions(), atLeast(46)],
    ['ability words', () => Scry.Catalog.abilityWords(), atLeast(49)],
    ['supertypes', () => Scry.Catalog.supertypes(), atLeast(7)],
    ['battle types', () => Scry.Catalog.battleTypes(), (rows: string[]) => expect(rows).toContain('Siege')],
    ['flavor words', () => Scry.Catalog.flavorWords(), (rows: string[]) => expect(rows.length).toBeGreaterThan(0)],
    ['card types', () => Scry.Catalog.cardTypes(), (rows: string[]) => expect(rows).toContain('Creature')],
  ])('%s', async (_name, load, check) => {
    check(await load());
  });
});
