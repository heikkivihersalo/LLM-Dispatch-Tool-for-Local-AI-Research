import { formatModelName } from '@/shared/utils/lib/formatModelName';
import { describe, it, expect } from 'vitest';

describe('#formatModelName', () => {
    it('should remove the :latest suffix', () => {
        const result = formatModelName('model:latest');
        expect(result).toBe('model');
    });

    it('should remove the :latest suffix and leave parameter information to the name', () => {
        const result = formatModelName('model:2b:latest');
        expect(result).toBe('model:2b');
    });
});
