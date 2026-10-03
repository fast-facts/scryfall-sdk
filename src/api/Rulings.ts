import { Cached } from '../util/Cached';
import MagicQuerier, { List } from '../util/MagicQuerier';

export interface Ruling {
  source: string;
  published_at: string;
  comment: string;
}

class Rulings extends MagicQuerier {
  private rulings(...path: (string | number)[]) {
    return this.query<List<Ruling>>(path).then(list => list.data);
  }

  /**
   * Returns the rulings for the card with the given id.
   * @param id The Scryfall id of the card.
   */
  @Cached
  public byId(id: string) {
    return this.rulings('cards', id, 'rulings');
  }

  /**
   * Returns the rulings for a card in a set.
   * @param setCode The set code of the card.
   * @param collectorNumber The collector number of the card.
   */
  @Cached
  public bySet(setCode: string, collectorNumber: string | number) {
    return this.rulings('cards', setCode, `${collectorNumber}`, 'rulings');
  }

  /**
   * Returns the rulings for the card with the given Multiverse id.
   * @param id The Multiverse id of the card.
   */
  @Cached
  public byMultiverseId(id: number) {
    return this.rulings('cards/multiverse', id, 'rulings');
  }

  /**
   * Returns the rulings for the card with the given Magic Online id.
   * @param id The Magic Online id of the card.
   */
  @Cached
  public byMtgoId(id: number) {
    return this.rulings('cards/mtgo', id, 'rulings');
  }

  /**
   * Returns the rulings for the card with the given Arena id.
   * @param id The Arena id of the card.
   */
  @Cached
  public byArenaId(id: number) {
    return this.rulings('cards/arena', id, 'rulings');
  }
}

export default new Rulings();
