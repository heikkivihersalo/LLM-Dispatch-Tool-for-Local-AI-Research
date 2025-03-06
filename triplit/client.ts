import { TriplitClient } from '@triplit/client';
import { schema } from './schema';

/**
 * Connect to triplet client using local-only mode
 * @link https://www.triplit.dev/docs/offline-mode#local-only-mode
 */
export const client = new TriplitClient({
    schema,
    storage: 'indexeddb',
});
