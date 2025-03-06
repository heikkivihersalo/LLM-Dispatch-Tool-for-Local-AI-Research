/**
 * External Dependencies
 */
import { type ReactElement } from 'react';

/**
 * Shared Dependencies
 */
import CommonLayout from '@/shared/layouts/common-layout';
import ContextFileLoader from '@/features/context-file-loader';
import JsonOptionsEditor from '@/features/json-options-editor';
import ContextInvokeMessage from '@/features/context-invoke-message';

import {
    OPTIONS_DEFAULT_VALUE,
    OPTIONS_LOCAL_STORAGE_KEY,
    SYSTEM_MESSAGE_DEFAULT_VALUE,
    SYSTEM_MESSAGE_LOCAL_STORAGE_KEY,
    RESPONSE_FORMAT_DEFAULT_VALUE,
    RESPONSE_FORMAT_LOCAL_STORAGE_KEY,
    MODEL_LOCAL_STORAGE_KEY,
    MODEL_DEFAULT_VALUE,
    EMBEDDING_MODEL_LOCAL_STORAGE_KEY,
    EMBEDDING_MODEL_DEFAULT_VALUE,
} from '@/shared/constants/localStorage';

import {
    OPTIONS_SCHEMA,
    SYSTEM_MESSAGE_SCHEMA,
    RESPONSE_FORMAT_SCHEMA,
} from '@/shared/constants/jsonSchema';

/**
 * Internal Dependencies
 */
import styles from './index.module.css';
import ModelTable from '@/features/model-table';

/**
 * Home page component
 * @return {ReactElement} Home page
 */
export default function Settings(): ReactElement {
    return (
        <CommonLayout title="Settings">
            <div className={styles.content} data-test-id="main-content">
                <div className={styles.defaultsContainer}>
                    <h2 className={styles.heading}>Chat Defaults</h2>
                    <p className={styles.description}>
                        You can edit the default options for AI requests here.
                        These values will be automatically stored to your device
                        locally.
                    </p>
                    <p>
                        Please also note that this tool requires Ollama to be
                        installed on your machine. Ollama supports macOS, Linux,
                        and Windows. Read more and download the tool from{' '}
                        <a href="https://ollama.com/">Ollama website</a>.
                    </p>
                    <h3>Model</h3>
                    <p>
                        Installed models are listed below. You can use{' '}
                        <code className={styles.code}>ollama run model</code> to
                        download and run new models. Remember to replace `model`
                        with the model name. This app uses the local API to
                        generate content based on the selected model. If model
                        is not running, API request will start the model
                        automatically.
                    </p>
                    <ModelTable
                        storageKey={MODEL_LOCAL_STORAGE_KEY}
                        storageDefaultValue={MODEL_DEFAULT_VALUE}
                        type="llm"
                    />
                    <JsonOptionsEditor
                        title="System Message"
                        storageKey={SYSTEM_MESSAGE_LOCAL_STORAGE_KEY}
                        storageDefaultValue={SYSTEM_MESSAGE_DEFAULT_VALUE}
                        schema={SYSTEM_MESSAGE_SCHEMA}
                    />
                    <JsonOptionsEditor
                        title="Options"
                        storageKey={OPTIONS_LOCAL_STORAGE_KEY}
                        storageDefaultValue={OPTIONS_DEFAULT_VALUE}
                        schema={OPTIONS_SCHEMA}
                    />
                    <h2>Modifying response format</h2>
                    <p>
                        You can instruct the tool to response in certain format
                        like JSON. Remember to also add the format to system
                        message. For example if you have properties for `age`
                        and `available`, you can add following to the end of the
                        system message: "Return a JSON object with the age and
                        availability." You can read more about the structured
                        response from the{' '}
                        <a href="https://github.com/ollama/ollama/blob/main/docs/api.md#chat-request-structured-outputs">
                            API documentation
                        </a>
                        .
                    </p>
                    <JsonOptionsEditor
                        title="Format"
                        storageKey={RESPONSE_FORMAT_LOCAL_STORAGE_KEY}
                        storageDefaultValue={RESPONSE_FORMAT_DEFAULT_VALUE}
                        schema={RESPONSE_FORMAT_SCHEMA}
                    />
                </div>
                <div className={styles.contextContainer}>
                    <h2>Context and Embeddings</h2>
                    <p>
                        You can upload a files for context and select embedding
                        models here. Files generated will be used in the request
                        context. Please note that you need to have some
                        embedding model installed to use this feature. Default
                        is `mxbai-embed-large` and can be installed with{' '}
                        <code className={styles.code}>
                            ollama run mxbai-embed-large
                        </code>
                        . You can find all available models from the{' '}
                        <a href="https://ollama.com/search?c=embedding">
                            Ollama website
                        </a>
                        .
                    </p>
                    <h3>Embedding Model</h3>
                    <p>
                        Select the model to be used as a embedding model here.
                    </p>
                    <ModelTable
                        storageKey={EMBEDDING_MODEL_LOCAL_STORAGE_KEY}
                        storageDefaultValue={EMBEDDING_MODEL_DEFAULT_VALUE}
                        type="embedding"
                    />
                    <ContextInvokeMessage />
                    <ContextFileLoader />
                </div>
            </div>
        </CommonLayout>
    );
}
