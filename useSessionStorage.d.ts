export declare function useSessionStorage<T>(key: string, initialValue: T): readonly [T, (value: T | ((prev: T) => T)) => void];
