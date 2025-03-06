import { classnames } from '@/shared/utils/lib/classnames';
import { describe, it, expect } from 'vitest';

describe('#classnames', () => {
    it('should return empty string if no arguments', () => {
        const result = classnames();
        expect(result).toBe('');
    });

    it('should return empty string if all arguments are undefined', () => {
        const result = classnames(undefined, undefined, undefined);
        expect(result).toBe('');
    });

    it('should return empty string if all arguments are empty strings', () => {
        const result = classnames('', '', '');
        expect(result).toBe('');
    });

    it('should return empty string if all arguments are null', () => {
        // @ts-expect-error Testing falsey values
        const result = classnames(null, null, null);
        expect(result).toBe('');
    });

    it('should return empty string if all arguments are false', () => {
        // @ts-expect-error Testing falsey values
        const result = classnames(false, false, false);
        expect(result).toBe('');
    });

    it('should return empty string if all arguments are 0', () => {
        // @ts-expect-error Testing falsey values
        const result = classnames(0, 0, 0);
        expect(result).toBe('');
    });

    it('should return empty string if all arguments are NaN', () => {
        // @ts-expect-error Testing falsey values
        const result = classnames(NaN, NaN, NaN);
        expect(result).toBe('');
    });

    it('should return empty string if all arguments are falsey', () => {
        // @ts-expect-error Testing falsey values
        const result = classnames(false, 0, '', null, undefined, NaN);
        expect(result).toBe('');
    });

    it('should return string with one class', () => {
        const result = classnames('class1');
        expect(result).toBe('class1');
    });

    it('should return string with two classes', () => {
        const result = classnames('class1', 'class2');
        expect(result).toBe('class1 class2');
    });

    it('should return string with three classes and falsey values', () => {
        const result = classnames(
            'class1',
            'class2',
            'class3',
            // @ts-expect-error Testing falsey values
            false,
            undefined,
            null,
            ''
        );
        expect(result).toBe('class1 class2 class3');
    });
});
