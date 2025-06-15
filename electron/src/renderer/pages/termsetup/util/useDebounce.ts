import { useState, useEffect, useRef, MutableRefObject } from 'react';

export const useDebounce = <T>(value: T, delay = 500): T => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    const timerRef: MutableRefObject<NodeJS.Timeout | undefined> = useRef();

    useEffect(() => {
        timerRef.current = setTimeout(() => setDebouncedValue(value), delay);

        return () => {
            clearTimeout(timerRef.current);
        };
    }, [value, delay]);

    return debouncedValue;
};
