/**
 * External dependencies
 *
 */
import type { ReactElement } from 'react';

/**
 * Shared dependencies
 */
import useLocalStorage from '@/shared/hooks/useLocalStorage';
import type { HydratedModel } from '@/shared/types/ollama/models';

/**
 * Internal dependencies
 */
import { formatModelName } from '@/shared/utils';

import styles from './ModelRunning.module.css';

type Props = {
    model: HydratedModel;
    storageKey: string;
    storageDefaultValue: string;
};

/**
 * ModelTableHead component
 * @return {ReactElement} ModelTableHead
 */
export default function ModelActions({
    model,
    storageKey,
    storageDefaultValue,
}: Props): ReactElement {
    const { value, save } = useLocalStorage(storageKey, storageDefaultValue);

    const isCurrentModel = formatModelName(model.name) === value;

    return (
        <td className={styles.actions} data-selected={isCurrentModel}>
            <button
                disabled={isCurrentModel}
                onClick={() => {
                    save(formatModelName(model.name));
                }}
            >
                {isCurrentModel ? 'Selected' : 'Select'}
            </button>
        </td>
    );
}
