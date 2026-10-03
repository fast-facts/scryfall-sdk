import { Cached } from '../util/Cached';
import MagicQuerier, { List } from '../util/MagicQuerier';

export type BulkDataType = 'oracle_cards' | 'unique_artwork' | 'default_cards' | 'all_cards' | 'rulings' | 'art_tags' | 'oracle_tags';

export interface BulkDataDefinition {
  object: 'bulk_data';

  id: string;
  uri: string;
  type: BulkDataType;
  name: string;
  description: string;
  jsonl_download_uri: string;
  updated_at: string;
  compressed_size: number;
}

class BulkData extends MagicQuerier {
  /**
   * Returns a stream for the given bulk data if it has been updated since the last download time. If it hasn't, returns `undefined`
   * @param type The bulk data type to download.
   * @param lastDownload The last time this bulk data was downloaded. If you want to re-download the data regardless of
   * the last time it was downloaded, set this to `0`.
   */
  public async downloadByType(type: BulkDataType, lastDownload: string | number | Date) {
    return this.download(type, lastDownload);
  }

  /**
   * Returns a stream for the given bulk data if it has been updated since the last download time. If it hasn't, returns `undefined`
   * @param id The id of the bulk data to download.
   * @param lastDownload The last time this bulk data was downloaded. If you want to re-download the data regardless of
   * the last time it was downloaded, set this to `0`.
   */
  public async downloadById(id: string, lastDownload: string | number | Date) {
    return this.download(id, lastDownload);
  }

  ////////////////////////////////////
  // Definitions
  //

  @Cached
  public async definitions() {
    return (await this.query<List<BulkDataDefinition>>('bulk-data')).data;
  }

  /**
   * Returns the definition for one bulk data type.
   * @param type The bulk data type to look up.
   */
  @Cached
  public async definitionByType(type: BulkDataType) {
    return this.definition(type);
  }

  /**
   * Returns the definition for one bulk data id.
   * @param id The id of the bulk data to look up.
   */
  @Cached
  public async definitionById(id: string) {
    return this.definition(id);
  }

  ////////////////////////////////////
  // Internals
  //

  private async download(idOrType: string, lastDownload: string | number | Date) {
    const definition = await this.definition(idOrType);
    if (new Date(lastDownload).getTime() > new Date(definition.updated_at).getTime())
      return undefined;

    const result = await fetch(definition.jsonl_download_uri, {
      method: 'GET',
      headers: {
        ...MagicQuerier.agentHeader(),
        Accept: '*/*',
      },
    });

    return result.body;
  }

  private definition(idOrType: string) {
    return this.query<BulkDataDefinition>(['bulk-data', idOrType]);
  }
}

export default new BulkData();
