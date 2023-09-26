import React from "react";
export declare function useCounter(initialValue?: number): {
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
    increment: () => void;
    decrement: () => void;
    reset: () => void;
};
