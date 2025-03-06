/**
 * External dependencies
 */
import type { ReactElement } from 'react';

/**
 * Internal dependencies
 */
import FileList from './components/FileList';
import FileUploader from './components/FileUploader';

/**
 * ContextLoader component
 * @return {ReactElement} ContextLoader
 */
export default function ContextFileLoader(): ReactElement {
    return (
        <div>
            <h3>Files</h3>
            <p>
                Documents that are added as an context. These are added to the
                local database and loaded to VectorStorage to be used in the
                embedding context and RAG.
            </p>
            <FileUploader />
            <FileList />
        </div>
    );
}
