import { useState, useEffect } from 'react';
import { OllamaEmbeddings } from '@langchain/ollama';
import { Document } from '@langchain/core/documents';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { useQuery, useConnectionStatus } from '@triplit/react';

/**
 * Shared dependencies
 */
import { client } from '../../../triplit/client';
import { API_BASE_URL } from '@/shared/constants/ollama';
import useLocalStorage from '@/shared/hooks/useLocalStorage';

import {
    EMBEDDING_MODEL_DEFAULT_VALUE,
    EMBEDDING_MODEL_LOCAL_STORAGE_KEY,
    CONTEXT_DEFAULT_VALUE,
    CONTEXT_LOCAL_STORAGE_KEY,
} from '@/shared/constants/localStorage';

/**
 * Internal dependencies
 */
const documentsQuery = client.query('documents');

/**
 * Use embedding
 * @return {Object}
 */
export default function useEmbedding() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error] = useState<unknown>(null);

    const { value: embeddingModel } = useLocalStorage(
        EMBEDDING_MODEL_LOCAL_STORAGE_KEY,
        EMBEDDING_MODEL_DEFAULT_VALUE
    );

    const { value: contextPrompt } = useLocalStorage(
        CONTEXT_LOCAL_STORAGE_KEY,
        CONTEXT_DEFAULT_VALUE
    );

    const { results } = useQuery(client, documentsQuery);
    const connectionStatus = useConnectionStatus(client);

    const [documents, setDocuments] = useState<Document[]>([]);

    /**
     * @link https://js.langchain.com/docs/integrations/text_embedding/ollama/
     */
    const [embeddings] = useState(
        new OllamaEmbeddings({
            model: embeddingModel, // Default value
            baseUrl: API_BASE_URL,
        })
    );

    /**
     * @link https://js.langchain.com/docs/integrations/vectorstores/memory
     */
    const [vectorStore] = useState<MemoryVectorStore>(
        new MemoryVectorStore(embeddings)
    );

    /**
     * Update documents from the database
     */
    useEffect(() => {
        if (!results) return;

        setIsLoading(true);

        // Convert the results to documents
        const parsedResults = results.map((result) => {
            // Convert back to Document[]
            const docs = Array.from(result.content).map((text) => {
                const json = JSON.parse(text);

                return new Document({
                    pageContent: json?.pageContent || '',
                    metadata: json?.metadata || {},
                });
            });

            return docs;
        });

        setDocuments(parsedResults.flat());
        setIsLoading(false);
    }, [results]);

    /**
     * Retrieve documents from the vector store
     * - Retrieves all related documents from the store based on a user prompt
     * - This is useful for generating context for the chat completion
     *
     * !NOTE This is done because AI context window is limited.
     * !     Therefore we need to narrow down the prossible context
     * @param {string} prompt - Prompt string
     * @return {Promise<string>}
     */
    const getRelevantDocs = async (): Promise<string> => {
        setIsLoading(true);

        // Add to the vector store
        await vectorStore.addDocuments(documents);

        // Retrieve documents
        const retriever = vectorStore.asRetriever();
        const docs = await retriever.invoke(contextPrompt);

        const string = docs.map((doc) => {
            return doc.pageContent;
        });

        setIsLoading(false);

        return string.join('\n\n');
    };

    return {
        documents,
        connectionStatus,
        isLoading,
        error,
        getRelevantDocs,
    };
}
