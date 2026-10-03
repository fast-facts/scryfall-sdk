import * as Scry from '../Scry';

function isDownload(result: unknown) {
  return result instanceof ReadableStream;
}

describe('Bulk Data', () => {
  let definitions: Scry.BulkDataDefinition[];

  describe('definitions', () => {
    it('all', async () => {
      definitions = await Scry.BulkData.definitions();
      expect(Array.isArray(definitions)).toBe(true);
      expect(definitions.length).toBeGreaterThanOrEqual(5);
    });

    it('by id', async () => {
      const result = await Scry.BulkData.definitionById(definitions[0].id);
      expect(result.object).toBe('bulk_data');
      expect(result.compressed_size).toBeGreaterThanOrEqual(10000);
    });

    it('by type', async () => {
      const result = await Scry.BulkData.definitionByType('all_cards');
      expect(result.object).toBe('bulk_data');
      expect(result.type).toBe('all_cards');
      expect(result.compressed_size).toBeGreaterThanOrEqual(10000);
    });

    it('tag files by type', async () => {
      const art = await Scry.BulkData.definitionByType('art_tags');
      expect(art.type).toBe('art_tags');
      const oracle = await Scry.BulkData.definitionByType('oracle_tags');
      expect(oracle.type).toBe('oracle_tags');
    });
  });

  describe('download', () => {
    describe('by id', () => {
      it('no matter the last download time', async () => {
        const result = await Scry.BulkData.downloadById(definitions[0].id, 0);
        expect(isDownload(result)).toBe(true);
      });

      it('with the last download time more recent than the last update time', async () => {
        const definition = await Scry.BulkData.definitionById(definitions[0].id);
        const result = await Scry.BulkData.downloadById(definition.id, new Date(definition.updated_at).getTime() + 10);
        expect(result).toBeUndefined();
      });
    });

    describe('by type', () => {
      it('no matter the last download time', async () => {
        const result = await Scry.BulkData.downloadByType('rulings', 0);
        expect(isDownload(result)).toBe(true);
      });

      it('with the last download time more recent than the last update time', async () => {
        const definition = await Scry.BulkData.definitionByType('rulings');
        const result = await Scry.BulkData.downloadByType('rulings', new Date(definition.updated_at).getTime() + 10);
        expect(result).toBeUndefined();
      });
    });
  });
});
