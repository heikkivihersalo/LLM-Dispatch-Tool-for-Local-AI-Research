/**
 * External dependencies
 *
 */
import type { ReactElement } from 'react';

/**
 * Shared dependencies
 */
import useLocalLLM from '@/shared/hooks/useLocalLLM';
import type { ModelType } from '@/shared/types/ollama/models';

/**
 * Internal dependencies
 */
import ModelTableHead from './components/ModelTableHead';
import ModelName from './components/ModelName';
import ModelParametersSize from './components/ModelParametersSize';
import ModelVramSize from './components/ModelVramSize';
import ModelRunning from './components/ModelRunning';
import ModelActions from './components/ModelActions';

import styles from './index.module.css';

type Props = {
    storageKey: string;
    storageDefaultValue: string;
    type: ModelType;
};

export default function ModelTable({
    storageKey,
    storageDefaultValue,
    type,
}: Props): ReactElement {
    const { models } = useLocalLLM({ type });

    return (
        <table className={styles.table}>
            <ModelTableHead />
            <tbody>
                {models.map((model) => {
                    return (
                        <tr key={model.name}>
                            <ModelName name={model.name} />
                            <ModelParametersSize
                                size={model.details.parameter_size}
                            />
                            <ModelVramSize size={model.size_vram} />
                            <ModelRunning isRunning={model.running} />
                            <ModelActions
                                model={model}
                                storageKey={storageKey}
                                storageDefaultValue={storageDefaultValue}
                            />
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
