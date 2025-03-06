/**
 * External dependencies
 */
import type { ReactElement } from 'react';

/**
 * Shared dependencies
 */
import {
    CONTEXT_DEFAULT_VALUE,
    CONTEXT_LOCAL_STORAGE_KEY,
} from '@/shared/constants/localStorage';
import useLocalStorage from '@/shared/hooks/useLocalStorage';

import styles from './index.module.css';

/**
 * InvokeInput component
 * @return {ReactElement} FileUploader
 */
export default function ContextInvokeMessage(): ReactElement {
    const { value, save } = useLocalStorage(
        CONTEXT_LOCAL_STORAGE_KEY,
        CONTEXT_DEFAULT_VALUE
    );

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Search Qyery</h3>
            <p>
                This is the prompt or query that is used to get the documents
                for context. System will return most relevant documents based on
                the prompt given here.
            </p>
            <div className={styles.inputWrapper}>
                <label className={styles.label} htmlFor="invoke-input">
                    Instructions
                </label>
                <textarea
                    id="invoke-input"
                    className={styles.textarea}
                    placeholder="Write any additional context instructions here"
                    value={value}
                    onChange={(e) => save(e.target.value)}
                    rows={5}
                />
            </div>
        </div>
    );
}
