/**
 * External dependencies
 */
import { type ReactElement } from 'react';

/**
 * Shared dependencies
 */
import useLocalLLM from '@/shared/hooks/useLocalLLM';

/**
 * Internal dependencies
 */
import styles from './index.module.css';

/**
 * LLMStatus component
 * @return {ReactElement} LLMStatus
 */
export default function LLMStatus(): ReactElement {
    const { version, active } = useLocalLLM({ type: 'all' });

    return (
        <div className={styles.status}>
            <span className={styles.description}>Ollama version: </span>
            <div className={styles.container}>
                <div className={styles.active} data-status={active} />
                <span className={styles.version}>
                    {active ? `v${version}` : 'Could not connect to LLM'}
                </span>
            </div>
        </div>
    );
}
