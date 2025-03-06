/**
 * Create a new response body with the given chunks
 */

import type {
    ChatConversationObject,
    ChatModel,
} from '@/shared/types/ollama/chat';

/**
 * Create a new response body with the given chunks
 * @param {ChatConversationObject} originalBody - Original body
 * @param {string[]} chunks - Chunks
 * @return {ChatConversationObject} New response body
 */
export function createResponseBody(
    originalBody: ChatConversationObject,
    chunks: string[]
): ChatConversationObject {
    return {
        model: originalBody.model as ChatModel,
        messages: [
            ...originalBody.messages,
            {
                role: 'assistant',
                content: chunks.join(''),
            },
        ],
        options: originalBody.options,
        tools: originalBody.tools || [],
    };
}
