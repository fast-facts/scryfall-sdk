import * as Scry from '../Scry';

describe('Catalog', () => {
  it('card names', async () => {
    const result = await Scry.Catalog.cardNames();
    expect(result.length).toBeGreaterThanOrEqual(18059);
  });

  it('artist names', async () => {
    const result = await Scry.Catalog.artistNames();
    expect(result.length).toBeGreaterThanOrEqual(676);
  });

  it('word bank', async () => {
    const result = await Scry.Catalog.wordBank();
    expect(result.length).toBeGreaterThanOrEqual(12892);
  });

  it('creature types', async () => {
    const result = await Scry.Catalog.creatureTypes();
    expect(result.length).toBeGreaterThanOrEqual(242);
  });

  it('planeswalker types', async () => {
    const result = await Scry.Catalog.planeswalkerTypes();
    expect(result.length).toBeGreaterThanOrEqual(42);
  });

  it('land types', async () => {
    const result = await Scry.Catalog.landTypes();
    expect(result.length).toBeGreaterThanOrEqual(13);
  });

  it('artifact types', async () => {
    const result = await Scry.Catalog.artifactTypes();
    expect(result.length).toBeGreaterThanOrEqual(6);
  });

  it('enchantment types', async () => {
    const result = await Scry.Catalog.enchantmentTypes();
    expect(result.length).toBeGreaterThanOrEqual(5);
  });

  it('spell types', async () => {
    const result = await Scry.Catalog.spellTypes();
    expect(result.length).toBeGreaterThanOrEqual(2);
  });

  it('powers', async () => {
    const result = await Scry.Catalog.powers();
    expect(result.length).toBeGreaterThanOrEqual(33);
  });

  it('toughnesses', async () => {
    const result = await Scry.Catalog.toughnesses();
    expect(result.length).toBeGreaterThanOrEqual(35);
  });

  it('loyalties', async () => {
    const result = await Scry.Catalog.loyalties();
    expect(result.length).toBeGreaterThanOrEqual(9);
  });

  it('watermarks', async () => {
    const result = await Scry.Catalog.watermarks();
    expect(result.length).toBeGreaterThanOrEqual(50);
  });

  it('keyword-abilities', async () => {
    const result = await Scry.Catalog.keywordAbilities();
    expect(result.length).toBeGreaterThanOrEqual(176);
  });

  it('keyword-actions', async () => {
    const result = await Scry.Catalog.keywordActions();
    expect(result.length).toBeGreaterThanOrEqual(46);
  });

  it('ability-words', async () => {
    const result = await Scry.Catalog.abilityWords();
    expect(result.length).toBeGreaterThanOrEqual(49);
  });

  it('supertypes', async () => {
    const result = await Scry.Catalog.supertypes();
    expect(result.length).toBeGreaterThanOrEqual(7);
  });
});
