export type EnsurePlainObject<T> = T extends object ? (T extends unknown[] ? never : T) : never;

export type PlainObject<T> = T extends EnsurePlainObject<T> ? { [K in keyof T]: T[K] } : never;
