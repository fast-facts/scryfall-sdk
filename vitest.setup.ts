import { afterAll } from 'vitest';
import * as Scry from './src/Scry';

Scry.setAgent('ScryfallSDKTests', '1.0');
Scry.setTimeout(200);
Scry.setRetry(4, 60_000, error => /rate-limited/.test(error.details ?? error.message));

afterAll(() => {
  Scry.setCacheDuration(0);
});
