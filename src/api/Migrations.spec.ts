import * as Scry from '../Scry';

describe('migrations', () => {
  it('all', async () => {
    const migrations = await Scry.Migrations.all().waitForAll();
    expect(migrations.length).toBeGreaterThanOrEqual(433);
  });

  it('by id', async () => {
    const migration = await Scry.Migrations.byId('2c970867-aec5-4d55-91ac-3a117b0da4c4');
    expect(migration.old_scryfall_id).toBe('d5bab733-6f20-4def-af19-534b3f9f54c4');
  });
});
