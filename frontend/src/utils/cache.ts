const cache = new Map<string, any>();

export const getCache = <T>(key: string): T | undefined => {
  return cache.get(key);
};

export const setCache = <T>(key: string, value: T) => {
  cache.set(key, value);
};
