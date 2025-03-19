import { useEffect, useState } from "react";

export const useDebounce = (value: number[] | { values: number[], direction: string, className: string }, delay: number)  => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue as unknown as {direction: string, className: string, values: number[]};
};