import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import '@testing-library/jest-dom';
import Home from './index.tsx';

describe('Home', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });
    it('should render the home page', () => {
        render(<Home />);
        expect(screen.getByTestId('main-content')).toBeDefined();
    });
});
