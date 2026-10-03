type AnyFunction = (...args: any[]) => any;

interface ICache {
  key?: any;
  value?: any;
  time: number;
  map: Map<any, ICache>;
  parent?: ICache;
}

// 1 hour default cache time
const DEFAULT_CACHE_DURATION = 1000 * 60 * 60;
let configuredCacheDuration = DEFAULT_CACHE_DURATION;

const DEFAULT_CACHE_LIMIT = 500;
let configuredCacheLimit = DEFAULT_CACHE_LIMIT;

let caches: ICache[] = [];

export function Cached(target: any, key: string, descriptor: TypedPropertyDescriptor<AnyFunction>) {
  const topCache: ICache = { map: new Map(), time: 0 };
  return {
    value(...args: any[]) {
      let cache: ICache = topCache;
      let shouldCache = false;
      if (cachingEnabled()) {
        // only put together caches when caches are enabled
        const now = Date.now();

        for (const arg of args) {
          // caches are applied to methods that take misc args, so they don't get handy query strings to hash by
          // as a result it's a pyramid of caches indexed by the arguments passed to the query methods
          let nextCache = cache.map.get(arg);
          if (!nextCache) {
            nextCache = { key: arg, map: new Map(), time: 0 };
            cache.map.set(arg, nextCache);
            nextCache.parent = cache;
          }
          cache = nextCache;
        }

        if (now - cache.time < configuredCacheDuration)
          return cache.value;

        const index = caches.indexOf(cache);
        if (index !== -1)
          caches.splice(index, 1);

        cache.time = now;
        shouldCache = true;
      }

      const result = descriptor.value!.apply(this, args);
      if (shouldCache) {
        cache.value = result;
        caches.push(cache);
        while (caches.length > configuredCacheLimit)
          deleteCacheValue(caches.shift()!);
        scheduleExpiry();
      }

      return result;
    },
  };
}

function deleteCacheValue(cache: ICache) {
  delete cache.value;
  if (cache.map.size === 0)
    cache.parent?.map.delete(cache.key);
}

let expiryTimer: ReturnType<typeof setTimeout> | undefined;

function cachingEnabled() {
  return configuredCacheDuration > 0 && configuredCacheLimit > 0;
}

function stopExpiry() {
  if (expiryTimer === undefined)
    return;
  clearTimeout(expiryTimer);
  expiryTimer = undefined;
}

function scheduleExpiry() {
  stopExpiry();
  if (!cachingEnabled()) {
    caches.forEach(deleteCacheValue);
    caches = [];
    return;
  }
  if (caches.length === 0)
    return;

  const delay = Math.max(0, caches[0].time + configuredCacheDuration - Date.now());
  expiryTimer = setTimeout(() => {
    expiryTimer = undefined;
    const now = Date.now();
    while (caches.length > 0 && now - caches[0].time >= configuredCacheDuration)
      deleteCacheValue(caches.shift()!);
    scheduleExpiry();
  }, delay);
}

function getObjectsCount() {
  return caches.length;
}

function isGarbageCollectorRunning() {
  return expiryTimer !== undefined;
}

function clear() {
  stopExpiry();
  caches.forEach(deleteCacheValue);
  caches = [];
}

function setDuration(ms: number) {
  if (configuredCacheDuration !== ms) {
    configuredCacheDuration = ms;
    scheduleExpiry();
  }
}

function resetCacheDuration() {
  setDuration(DEFAULT_CACHE_DURATION);
}

function setLimit(count: number) {
  configuredCacheLimit = count;
  while (caches.length > configuredCacheLimit)
    deleteCacheValue(caches.shift()!);
  scheduleExpiry();
}

function resetLimit() {
  setLimit(DEFAULT_CACHE_LIMIT);
}

export const cache = {
  getObjectsCount,
  isGarbageCollectorRunning,
  clear,
  resetCacheDuration,
  setDuration,
  resetLimit,
  setLimit,
};
