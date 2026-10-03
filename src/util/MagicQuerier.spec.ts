import * as Scry from '../Scry';

describe('on errors', () => {
  it('should retry', async () => {
    const then = Date.now();
    const attempts = 3;
    const timeout = 1000;
    Scry.setRetry(attempts, timeout, () => true);
    await expect(Scry.Cards.byMultiverseId(0)).rejects.toMatchObject({ status: 404 });
    Scry.setRetry(4, 60_000, error => /rate-limited/.test(error.details ?? error.message));
    expect(Date.now() - then).toBeGreaterThan(attempts * timeout);
  });
});
