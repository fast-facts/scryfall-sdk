import * as Scry from '../Scry';
import MagicQuerier, { minimumRequestTimeout, requestWait } from './MagicQuerier';

describe('request spacing', () => {
  it('waits longer only on slow routes', () => {
    const now = 10_000;
    expect(requestWait(now, now - 50, 0, 100)).toBe(50);
    expect(requestWait(now, now - 1000, now - 100, 100, 500)).toBe(400);
    expect(requestWait(now, now - 1000, 0, 200, 500)).toBe(0);
    expect(requestWait(now, now - 1000, now - 1000, 200, 6000)).toBe(5000);
    expect(requestWait(now, now - 100, now - 100, 1000, 500)).toBe(900);
  });

  it('does not space calls below the minimum', () => {
    const previous = MagicQuerier.timeout;
    try {
      Scry.setTimeout(1);
      expect(MagicQuerier.timeout).toBe(minimumRequestTimeout);
      Scry.setTimeout(250);
      expect(MagicQuerier.timeout).toBe(250);
    } finally {
      MagicQuerier.timeout = previous;
    }
  });
});

describe('agent header', () => {
  it('joins the name and version', () => {
    const previous = MagicQuerier.agent;
    try {
      Scry.setAgent('Name', '2');
      expect(MagicQuerier.agent).toBe('Name/2');
      expect(MagicQuerier.agentHeader()).toEqual({ 'User-Agent': 'Name/2' });
    } finally {
      MagicQuerier.agent = previous;
    }
  });

  it('omits the agent in a browser', () => {
    vi.stubGlobal('window', {});
    try {
      expect(MagicQuerier.agentHeader()).toBeUndefined();
    } finally {
      vi.unstubAllGlobals();
    }
  });
});

describe('on errors', () => {
  it('should retry', async () => {
    const retry = MagicQuerier.retry;
    const then = Date.now();
    const attempts = 3;
    const timeout = 1000;
    Scry.setRetry(attempts, timeout, () => true);
    try {
      await expect(Scry.Cards.byMultiverseId(0)).rejects.toMatchObject({ status: 404, attempts });
      expect(Date.now() - then).toBeGreaterThan(attempts * timeout);
    } finally {
      MagicQuerier.retry = retry;
    }
  });

  it('retries a dropped connection', async () => {
    const fetch = vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('offline'));
    const retry = MagicQuerier.retry;
    Scry.setRetry(1);
    try {
      await expect(Scry.Cards.byId('00000000-0000-0000-0000-000000000001')).rejects.toMatchObject({ code: 'network' });
      expect(fetch).toHaveBeenCalledTimes(3);
    } finally {
      fetch.mockRestore();
      MagicQuerier.retry = retry;
    }
  });

  it('does not retry not_found by default', async () => {
    const retry = MagicQuerier.retry;
    Scry.setRetry(3, 50);
    const before = MagicQuerier.requestCount;
    try {
      await expect(Scry.Cards.byId('00000000-0000-0000-0000-000000000000')).rejects.toThrow();
      expect(MagicQuerier.requestCount - before).toBe(1);
    } finally {
      MagicQuerier.retry = retry;
    }
  });
});
