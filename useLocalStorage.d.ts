export declare function useLocalStorage<T>(key: string, initialValue: T): readonly [any, (value: T | ((prev: T) => T)) => void];
