/**
 * External dependencies
 */
import { useQuery, useConnectionStatus } from '@triplit/react';
import { CSVLoader } from '@langchain/community/document_loaders/fs/csv';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';

/**
 * Internal dependencies
 */
import { client } from '../../../../../triplit/client';

const documentsQuery = client.query('documents');

/**
 * Use documents database
 * @return {Object}
 */
export function useDocumentsDB() {
    const { results, fetching, error } = useQuery(client, documentsQuery);
    const connectionStatus = useConnectionStatus(client);

    /**
     * Load CSV document
     * @param {File} file - CSV file
     * @return {Promise<void>} - Promise
     */
    const insertCSV = async (file: File): Promise<void> => {
        const name = file?.name;

        const loader = new CSVLoader(file);

        // Split the document into characters
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        });

        const texts = await splitter.splitDocuments(await loader.load());

        // Add documents to database
        client.insert('documents', {
            name,
            content: new Set(
                texts.map((text) => {
                    return JSON.stringify(text);
                })
            ),
            created_at: new Date(),
        });
    };

    /**
     * Delete a CSV document
     * @param {string} id - Document ID
     * @return {Promise<void>} - Promise
     */
    const deleteRow = async (id: string): Promise<void> => {
        await client.delete('documents', id);
    };

    return {
        data: results,
        isFetching: fetching,
        error,
        connectionStatus,
        insertCSV,
        deleteRow,
    };
}
