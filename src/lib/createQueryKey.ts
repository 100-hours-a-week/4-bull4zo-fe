export const createQueryKey =
  <T extends string>(prefix: T) =>
  <P extends any[]>(...params: P) =>
    [prefix, ...params] as const
