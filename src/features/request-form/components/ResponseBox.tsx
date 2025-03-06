/**
 * External dependencies
 */
import type { ReactElement } from 'react';

import styles from './ResponseBox.module.css';

/**
 * ResponseBox component
 * @param {string[]} chunks - Chunks of response
 * @return {ReactElement} ResponseBox
 */
export default function ResponseBox({
    chunks,
}: {
    chunks: string[];
}): ReactElement | null {
    if (chunks.length === 0) {
        return null;
    }

    return (
        <div className={styles.container}>
            <div className={styles.bubble}>AI</div>
            <div className={styles.dialog}>{chunks.join('')}</div>
        </div>
    );
}
