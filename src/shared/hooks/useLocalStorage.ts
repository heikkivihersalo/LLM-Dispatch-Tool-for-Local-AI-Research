/**
 * External dependencies
 */
import { useEffect, useRef, useState } from 'react';

/**
 * Use local storage
 * @param key The key to use in local storage
 * @param defaultValue The default value to use
 * @return [T, (value: T) => void]
 */
export default function useLocalStorage<T>(
    key: string,
    defaultValue: T
): {
    value: T;
    save: (value: T) => void;
    isLoaded: boolean;
} {
    const [value, setValue] = useState(defaultValue);
    const isLoaded = useRef(false);

    useEffect(() => {
        const item = localStorage.getItem(key);

        if (!item) {
            localStorage.setItem(key, JSON.stringify(defaultValue));
        }

        setValue(item ? JSON.parse(item) : defaultValue);

        function handler(e: StorageEvent) {
            if (e.key !== key) return;
            setValue(JSON.parse(localStorage.getItem(key) ?? ''));
        }

        window.addEventListener('storage', handler);

        isLoaded.current = true;

        return () => {
            window.removeEventListener('storage', handler);
        };
    }, [defaultValue, key]);

    /**
     * Set the value in local storage
     * @param value The value to set in local storage
     * @return void
     */
    const save = (value: T) => {
        try {
            setValue(value);

            localStorage.setItem(key, JSON.stringify(value));

            if (typeof window !== 'undefined') {
                window.dispatchEvent(new StorageEvent('storage', { key }));
            }
        } catch (e) {
            console.error(e);
        }
    };

    return {
        value,
        save,
        isLoaded: isLoaded.current,
    };
}
