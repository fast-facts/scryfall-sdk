import MagicEmitter from '../util/MagicEmitter';
import MagicQuerier from '../util/MagicQuerier';

export enum MigrationStrategy {
  Merge = 'merge',
  Delete = 'delete',
}

export interface Migration {
  object: 'migration';

  uri: string;
  id: string;
  performed_at: string;
  migration_strategy: MigrationStrategy;
  old_scryfall_id: string;
  new_scryfall_id?: string | null;
  note?: string | null;
  metadata?: unknown;
}

class Migrations extends MagicQuerier {
  /**
   * Returns card id migrations, starting at the given page.
   * @param page The page to start on. Defaults to `1`.
   */
  public all(page = 1) {
    const emitter = new MagicEmitter<Migration>();

    this.queryPage(emitter, 'migrations', {}, page)
      .catch((err: Error) => emitter.emit('error', err));

    return emitter;
  }

  /**
   * Returns the card id migration with the given id.
   * @param id The id of the migration.
   */
  public byId(id: string) {
    return this.query<Migration>(['migrations', id]);
  }
}

export default new Migrations();
