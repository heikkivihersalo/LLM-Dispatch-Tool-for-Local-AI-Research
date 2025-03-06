/**
 * External dependencies
 *
 */
import type { ReactElement } from 'react';

/**
 * Internal dependencies
 */
import styles from './ModelRunning.module.css';

/**
 * ModelTableHead component
 * @return {ReactElement} ModelTableHead
 */
export default function ModelRunning({
    isRunning,
}: {
    isRunning: boolean;
}): ReactElement {
    return (
        <td data-running={isRunning}>
            <div className={styles.circle} />
        </td>
    );
}
