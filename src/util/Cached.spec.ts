import * as Scry from '../Scry';
import { cache } from './Cached';

describe('cache', () => {
  beforeEach(() => {
    cache.clear();
    cache.resetCacheDuration();
    cache.resetLimit();
  });

  it('should support custom cache times and disabling caching by setting the cache time to 0', async () => {
    expect(cache.getObjectsCount()).toBe(0);
    const card1 = await Scry.Cards.byId('9ea8179a-d3c9-4cdc-a5b5-68cc73279050');
    const card2 = await Scry.Cards.byId('9ea8179a-d3c9-4cdc-a5b5-68cc73279050');
    expect(cache.getObjectsCount()).toBe(1);
    expect(card1).toBe(card2);

    Scry.setCacheDuration(0);
    expect(cache.getObjectsCount()).toBe(0);
    const card3 = await Scry.Cards.byId('9ea8179a-d3c9-4cdc-a5b5-68cc73279050');
    expect(card3).not.toBe(card1);
    expect(cache.getObjectsCount()).toBe(0);

    Scry.setCacheDuration(1000 * 10);
    const card4 = await Scry.Cards.byId('9ea8179a-d3c9-4cdc-a5b5-68cc73279050');
    const card5 = await Scry.Cards.byId('9ea8179a-d3c9-4cdc-a5b5-68cc73279050');
    expect(card4).toBe(card5);
    expect(cache.getObjectsCount()).toBe(1);
    expect(cache.isGarbageCollectorRunning()).toBe(true);
    await new Promise(resolve => setTimeout(resolve, 1000 * 13));
    expect(cache.isGarbageCollectorRunning()).toBe(false);
    expect(cache.getObjectsCount()).toBe(0);
    const card6 = await Scry.Cards.byId('9ea8179a-d3c9-4cdc-a5b5-68cc73279050');
    expect(card6).not.toBe(card4);
  });

  it('should support custom cache limits and disabling caching by setting the cache limit to 0', async () => {
    Scry.setCacheDuration(1000 * 10);
    const card1 = await Scry.Cards.byId('9ea8179a-d3c9-4cdc-a5b5-68cc73279050');
    const card2 = await Scry.Cards.byId('9ea8179a-d3c9-4cdc-a5b5-68cc73279050');
    const card3 = await Scry.Cards.byId('41bd76f3-299d-4bc0-a603-2cc7db7dac7b');
    const card4 = await Scry.Cards.byId('41bd76f3-299d-4bc0-a603-2cc7db7dac7b');
    expect(cache.getObjectsCount()).toBe(2);
    expect(card1).toBe(card2);
    expect(card3).toBe(card4);

    Scry.setCacheLimit(0);
    expect(cache.getObjectsCount()).toBe(0);
    Scry.setCacheLimit(1);
    const card5 = await Scry.Cards.byId('9ea8179a-d3c9-4cdc-a5b5-68cc73279050');
    const card6 = await Scry.Cards.byId('9ea8179a-d3c9-4cdc-a5b5-68cc73279050');
    const card7 = await Scry.Cards.byId('41bd76f3-299d-4bc0-a603-2cc7db7dac7b');
    expect(cache.getObjectsCount()).toBe(1);
    const card8 = await Scry.Cards.byId('41bd76f3-299d-4bc0-a603-2cc7db7dac7b');
    const card9 = await Scry.Cards.byId('9ea8179a-d3c9-4cdc-a5b5-68cc73279050');
    const card10 = await Scry.Cards.byId('41bd76f3-299d-4bc0-a603-2cc7db7dac7b');
    expect(cache.getObjectsCount()).toBe(1);
    expect(card5).toBe(card6);
    expect(card7).toBe(card8);
    expect(card9).not.toBe(card6);
    expect(card10).not.toBe(card8);
  });
});
