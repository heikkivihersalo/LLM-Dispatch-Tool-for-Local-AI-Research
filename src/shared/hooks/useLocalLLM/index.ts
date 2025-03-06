/**
 * External dependencies
 */
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

/**
 * Shared dependencies
 */
import { API_BASE_URL } from '@/shared/constants/ollama';
import { type ChatConversationObject } from '@/shared/types/ollama/chat';
import type { ModelType } from '@/shared/types/ollama/models';

/**
 * Internal dependencies
 */
import { createResponseBody, getMetadata, parseChunk } from './utils';
import type { UseLocalLLM } from './types';

type Props = {
    type: ModelType;
};

/**
 * Use local LLM
 *
 * @return {Object}
 */
export default function useLocalLLM({ type }: Props): UseLocalLLM {
    const [UIChunks, setUIChunks] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    /**
     * Fetch LLM metadata on mount
     * - Version
     * - Available AI models
     * - Active status
     */
    const { data: metadata } = useQuery({
        queryKey: ['version', 'models', type],
        queryFn: async ({ queryKey }) => {
            const { version, models } = await getMetadata(
                queryKey[2] as ModelType // type
            );

            return {
                active: Boolean(models.length),
                version,
                models,
            };
        },
    });

    /**
     * Handle stream response recursively
     * @param {ReadableStreamDefaultReader<Uint8Array>} reader - Stream reader
     * @param {TextDecoder} textDecoder - Text decoder
     * @return {Promise<string[]>}
     */
    const handleStreamResponse = async (
        reader: ReadableStreamDefaultReader<Uint8Array>,
        decoder: TextDecoder
    ): Promise<string[]> => {
        const chunks: string[] = [];

        while (true) {
            const { done, value } = await reader.read();

            if (done) break;

            const chunk = parseChunk(decoder.decode(value));

            chunks.push(chunk);

            // Update state for UI purposes
            setUIChunks((prevChunks) => [...prevChunks, chunk]);
        }

        return chunks;
    };

    /**
     * Generate chat conversation
     * @param {Object} [props] - Properties
     * @param {ChatConversationObject} [props.body] - Chat conversation object
     * @param {string} [props.context] - Context
     * @return {Promise<ChatConversationObject>}
     */
    const generate = async ({
        body,
        context = null,
    }: {
        body: ChatConversationObject;
        context?: string | null;
    }): Promise<ChatConversationObject | undefined> => {
        setIsLoading(true);
        setUIChunks([]);

        // Add context to the latest user message if available
        if (context || context !== '') {
            body.messages[body.messages.length - 1].content +=
                `. Use following context with your answer ${context}`;
        }

        const response = await fetch(`${API_BASE_URL}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error('Failed to generate chat conversation');
        }

        if (body.stream) {
            const reader = response.body?.getReader();
            if (!reader) throw new Error('Failed to get reader');

            const streamedChunks = await handleStreamResponse(
                reader,
                new TextDecoder()
            );

            setIsLoading(false);

            return createResponseBody(body, streamedChunks);
        } else {
            const data = await response.json();
            setIsLoading(false);
            return createResponseBody(body, [data.message.content]);
        }
    };

    return {
        version: metadata?.version || '',
        active: metadata?.active || false,
        models: metadata?.models || [],
        UIChunks,
        generate,
        isLoading,
    };
}
