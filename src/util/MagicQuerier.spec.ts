import * as Scry from '../Scry';
import { requestWait } from './MagicQuerier';

describe('request spacing', () => {
  it('waits longer only on slow routes', () => {
    const now = 10_000;
    expect(requestWait(now, now - 50, 0, 100)).toBe(50);
    expect(requestWait(now, now - 1000, now - 100, 100, 500)).toBe(400);
    expect(requestWait(now, now - 1000, 0, 200, 500)).toBe(0);
    expect(requestWait(now, now - 1000, now - 1000, 200, 6000)).toBe(5000);
    expect(requestWait(now, now - 100, now - 100, 1000, 500)).toBe(900);
  });
});

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
