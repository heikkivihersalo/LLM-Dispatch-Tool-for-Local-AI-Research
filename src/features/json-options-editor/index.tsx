/**
 * External dependencies
 *
 */
import CodeMirror, { type ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { linter } from '@codemirror/lint';
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
import useLocalStorage from '@/shared/hooks/useLocalStorage';
import Button from '@/shared/components/Button';

/**
 * Internal dependencies
 */
import { prettifyJSON } from '@/shared/utils';

import styles from './index.module.css';

type Props = {
    title: string;
    storageKey: string;
    storageDefaultValue: unknown;
    schema: JSONSchema7;
};

/**
 * SystemMessageEditor component
 * @return {ReactElement} SystemMessageEditor
 */
export default function JsonOptionsEditor({
    title,
    storageKey,
    storageDefaultValue,
    schema,
}: Props): ReactElement {
    const editorRef = useRef<ReactCodeMirrorRef>(null);

    const { value, save, isLoaded } = useLocalStorage(
        storageKey,
        JSON.stringify(storageDefaultValue)
    );

    const [editorValue, setEditorValue] = useState(value);

    // Handle updates to options prop
    useEffect(() => {
        if (editorRef.current?.view) {
            const currentValue = editorRef.current.view.state.doc.toString();

            // Only update if values are different
            if (currentValue !== value) {
                setEditorValue(value);
                editorRef.current.view.dispatch({
                    changes: {
                        from: 0,
                        to: currentValue.length,
                        insert: prettifyJSON(value),
                    },
                });
            }
        }
    }, [value]);

    // Make sure that the editor is loaded before setting the value
    useEffect(() => {
        if (isLoaded) {
            setEditorValue(value);
        }
    }, [isLoaded, value]);

    return (
        <>
            <div className={styles.header}>
                <h3 className={styles.heading}>{title}</h3>
                <Button
                    onClick={() =>
                        save(JSON.stringify(storageDefaultValue, null, 2))
                    }
                    className={styles.resetButton}
                >
                    Reset
                </Button>
            </div>
            <CodeMirror
                ref={editorRef}
                value={prettifyJSON(editorValue)} // Pretty print JSON
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
                    stateExtensions(schema as JSONSchema7),
                ]}
                theme="dark"
                onChange={(val) => save(val)}
                style={{
                    lineHeight: '1',
                    fontSize: '14px',
                    fontFamily:
                        'Menlo, Monaco, Consolas, "Courier New", monospace',
                }}
                className=""
            />
        </>
    );
}
