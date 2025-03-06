/**
 * External dependencies
 *
 */
import CodeMirror, { type ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { linter, diagnosticCount } from '@codemirror/lint';
import { hoverTooltip } from '@codemirror/view';
import { json, jsonParseLinter, jsonLanguage } from '@codemirror/lang-json';
import {
    jsonSchemaLinter,
    jsonSchemaHover,
    jsonCompletion,
    stateExtensions,
    handleRefresh,
} from 'codemirror-json-schema';

import type { JSONSchema7 } from 'json-schema';

import { useState, useRef, useEffect } from 'react';
import type { ReactElement } from 'react';

/**
 * Shared dependencies
 */
import {
    MODEL_DEFAULT_VALUE,
    MODEL_LOCAL_STORAGE_KEY,
    SYSTEM_MESSAGE_DEFAULT_VALUE,
    SYSTEM_MESSAGE_LOCAL_STORAGE_KEY,
    OPTIONS_DEFAULT_VALUE,
    OPTIONS_LOCAL_STORAGE_KEY,
    RESPONSE_FORMAT_DEFAULT_VALUE,
    RESPONSE_FORMAT_LOCAL_STORAGE_KEY,
    USER_INPUT_DEFAULT_VALUE,
} from '@/shared/constants/localStorage';

import useLocalStorage from '@/shared/hooks/useLocalStorage';
import { useChatDB, useDocumentsDB } from '@/shared/hooks/useDB';
import useLocalLLM from '@/shared/hooks/useLocalLLM';
import useEmbedding from '@/shared/hooks/useEmbedding';
import LoadingSpinner from '@/shared/components/Spinner';
import Button from '@/shared/components/Button';

/**
 * Internal dependencies
 */
import { REQUEST_SCHEMA } from './schema';
import formatRequestJSON from './utils/formatRequestJSON';
import ResponseBox from './components/ResponseBox';

import styles from './index.module.css';
import type { ChatModel } from '@/shared/types/ollama/chat';

/**
 * Request Form component
 * @return {ReactElement} Request Form
 */
export default function RequestForm(): ReactElement {
    const editorRef = useRef<ReactCodeMirrorRef>(null);
    const [hasErrors, setHasErrors] = useState<boolean>(false);

    const { insert } = useChatDB();
    const { data: contextDocuments } = useDocumentsDB();
    const { isLoading: contextLoading, getRelevantDocs } = useEmbedding();

    const { value: model, isLoaded: modelIsLoaded } = useLocalStorage(
        MODEL_LOCAL_STORAGE_KEY,
        MODEL_DEFAULT_VALUE
    );

    const { value: systemMessage, isLoaded: systemMessageIsLoaded } =
        useLocalStorage(
            SYSTEM_MESSAGE_LOCAL_STORAGE_KEY,
            JSON.stringify(SYSTEM_MESSAGE_DEFAULT_VALUE)
        );

    const { value: options, isLoaded: optionsIsLoaded } = useLocalStorage(
        OPTIONS_LOCAL_STORAGE_KEY,
        JSON.stringify(OPTIONS_DEFAULT_VALUE)
    );

    const { value: format, isLoaded: formatIsLoaded } = useLocalStorage(
        RESPONSE_FORMAT_LOCAL_STORAGE_KEY,
        JSON.stringify(RESPONSE_FORMAT_DEFAULT_VALUE)
    );

    const [editorValue, setEditorValue] = useState<string>(
        formatRequestJSON({
            model: model as ChatModel,
            systemMessage: JSON.parse(systemMessage),
            userMessage: JSON.parse(USER_INPUT_DEFAULT_VALUE),
            options: JSON.parse(options),
            format: JSON.parse(format),
            stream: true,
        })
    );

    const {
        active,
        UIChunks,
        generate,
        isLoading: responseLoading,
    } = useLocalLLM({
        type: 'all',
    });

    // Handle updates to options prop
    useEffect(() => {
        if (editorRef.current?.view) {
            const currentValue = editorRef.current.view.state.doc.toString();

            // Only update if values are different
            if (currentValue !== editorValue) {
                editorRef.current.view.dispatch({
                    changes: {
                        from: 0,
                        to: currentValue.length,
                        insert: editorValue,
                    },
                });
            }
        }
    }, [editorValue]);

    // Handle update when values from local storage are loaded
    useEffect(() => {
        if (modelIsLoaded && systemMessageIsLoaded && optionsIsLoaded) {
            setEditorValue(
                formatRequestJSON({
                    model: model as ChatModel,
                    systemMessage: JSON.parse(systemMessage),
                    userMessage: JSON.parse(USER_INPUT_DEFAULT_VALUE),
                    options: JSON.parse(options),
                    format: JSON.parse(format),
                    stream: true,
                })
            );
        }
    }, [
        modelIsLoaded,
        systemMessageIsLoaded,
        optionsIsLoaded,
        formatIsLoaded,
        model,
        systemMessage,
        options,
        format,
    ]);

    return (
        <>
            <h2 className={styles.heading}>Send request to LLM</h2>
            <p className={styles.description}>
                You can send requests to LLM models here. Defaults can be set
                from `Settings` -page and will appear here. However you can also
                modify the JSON directly here. Please do note that the changes
                to generic settings don't be saved to system globals.
            </p>
            <CodeMirror
                ref={editorRef}
                value={editorValue} // Pretty print JSON
                height="600px"
                extensions={[
                    json(),
                    linter(jsonParseLinter(), {
                        // default is 750ms
                        delay: 300,
                    }),
                    linter(jsonSchemaLinter(), {
                        needsRefresh: handleRefresh,
                    }),
                    jsonLanguage.data.of({
                        autocomplete: jsonCompletion(),
                    }),
                    hoverTooltip(jsonSchemaHover()),
                    stateExtensions(REQUEST_SCHEMA as JSONSchema7),
                ]}
                theme="dark"
                onChange={(val) => {
                    setEditorValue(val);
                }}
                onUpdate={(v) => {
                    // Get errors from the view state
                    const diagnostics = diagnosticCount(v.state);

                    // Set the error state
                    setHasErrors(diagnostics > 0);
                }}
                style={{
                    lineHeight: '1',
                    fontSize: '14px',
                    fontFamily:
                        'Menlo, Monaco, Consolas, "Courier New", monospace',
                }}
                className=""
            />
            <ResponseBox chunks={UIChunks} />
            <div className={styles.actionButtons}>
                <Button
                    onClick={async () => {
                        // Check if there are any context documents available
                        const context =
                            (contextDocuments ?? []).length > 0
                                ? await getRelevantDocs()
                                : '';

                        // Wait for response
                        const response = await generate({
                            body: JSON.parse(editorValue),
                            context: context,
                        });

                        // Update the database
                        insert({
                            model: response?.model as ChatModel,
                            messages: response?.messages || [],
                            options: response?.options || {},
                            tools: response?.tools || [],
                        });
                    }}
                    disabled={
                        !active ||
                        responseLoading ||
                        contextLoading ||
                        hasErrors
                    }
                >
                    {responseLoading || contextLoading ? (
                        <LoadingSpinner />
                    ) : (
                        'Send request'
                    )}
                </Button>
                <Button
                    className={styles.resetButton}
                    onClick={() => {
                        setEditorValue(
                            formatRequestJSON({
                                model: model as ChatModel,
                                systemMessage: JSON.parse(systemMessage),
                                userMessage: JSON.parse(
                                    USER_INPUT_DEFAULT_VALUE
                                ),
                                format: JSON.parse(format),
                                options: JSON.parse(options),
                                stream: true,
                            })
                        );
                    }}
                >
                    Reset
                </Button>
            </div>
        </>
    );
}
