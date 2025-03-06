/**
 * External dependencies
 */
import type { ReactElement } from 'react';

/**
 * Shared dependencies
 */
import { useDocumentsDB } from '@/shared/hooks/useDB';

/**
 * FileUploader component
 * @return {ReactElement} FileUploader
 */
export default function FileList(): ReactElement {
    const { data, deleteRow } = useDocumentsDB();

    return (
        <div>
            {data && data.length > 0 ? (
                <ul>
                    {data.map((doc) => (
                        <li key={doc.id}>
                            {doc.name}{' '}
                            <button onClick={() => deleteRow(doc.id)}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No context loaded</p>
            )}
        </div>
    );
}
