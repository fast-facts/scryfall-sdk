import { Cached } from '../util/Cached';
import MagicQuerier, { List } from '../util/MagicQuerier';

export interface Ruling {
  source: string;
  published_at: string;
  comment: string;
}

class Rulings extends MagicQuerier {
  /**
   * Returns the rulings for the card with the given id.
   * @param id The Scryfall id of the card.
   */
  @Cached
  public async byId(id: string) {
    return (await this.query<List<Ruling>>(['cards', id, 'rulings'])).data;
  }

  /**
   * Returns the rulings for a card in a set.
   * @param setCode The set code of the card.
   * @param collectorNumber The collector number of the card.
   */
  @Cached
  public async bySet(setCode: string, collectorNumber: string | number) {
    return (await this.query<List<Ruling>>(['cards', setCode, `${collectorNumber}`, 'rulings'])).data;
  }

  /**
   * Returns the rulings for the card with the given Multiverse id.
   * @param id The Multiverse id of the card.
   */
  @Cached
  public async byMultiverseId(id: number) {
    return (await this.query<List<Ruling>>(['cards/multiverse', id, 'rulings'])).data;
  }

  /**
   * Returns the rulings for the card with the given Magic Online id.
   * @param id The Magic Online id of the card.
   */
  @Cached
  public async byMtgoId(id: number) {
    return (await this.query<List<Ruling>>(['cards/mtgo', id, 'rulings'])).data;
  }

  /**
   * Returns the rulings for the card with the given Arena id.
   * @param id The Arena id of the card.
   */
  @Cached
  public async byArenaId(id: number) {
    return (await this.query<List<Ruling>>(['cards/arena', id, 'rulings'])).data;
  }
}

export default new Rulings();
