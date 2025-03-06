import { afterEach } from 'vitest';
import { configure, cleanup } from '@testing-library/react';

// This enables to use `data-test-id` attribute for testing in components
configure({ testIdAttribute: 'data-test-id' });

// Runs a clean after each test case (e.g. clearing jsdom) `important for test isolation`
afterEach(() => {
    cleanup();
});
