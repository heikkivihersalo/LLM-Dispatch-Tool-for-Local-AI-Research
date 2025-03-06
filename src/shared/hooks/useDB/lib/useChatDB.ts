/**
 * External dependencies
 */
import { useQuery, useConnectionStatus } from '@triplit/react';

/**
 * Shared dependencies
 */
import type { ChatConversationObject } from '@/shared/types/ollama/chat';
import { OPTIONS_DEFAULT_VALUE } from '@/shared/constants/localStorage';

/**
 * Internal dependencies
 */
import { client } from '../../../../../triplit/client';

const chatQuery = client.query('chat');

/**
 * Use chat database
 * @return {Object}
 */
export function useChatDB() {
    const { results, fetching, error } = useQuery(client, chatQuery);
    const connectionStatus = useConnectionStatus(client);

    /**
     * Insert chat conversation
     * @param {ChatConversationObject} data - Chat conversation data
     */
    const insert = async (data: ChatConversationObject) => {
        return await client.insert('chat', {
            model: data.model,
            messages: JSON.stringify(data.messages),
            stream: data.stream || false,
            options: {
                mirostat:
                    data.options?.mirostat || OPTIONS_DEFAULT_VALUE.mirostat,
                mirostat_eta:
                    data.options?.mirostat_eta ||
                    OPTIONS_DEFAULT_VALUE.mirostat_eta,
                mirostat_tau:
                    data.options?.mirostat_tau ||
                    OPTIONS_DEFAULT_VALUE.mirostat_tau,
                num_ctx: data.options?.num_ctx || OPTIONS_DEFAULT_VALUE.num_ctx,
                repeat_last_n:
                    data.options?.repeat_last_n ||
                    OPTIONS_DEFAULT_VALUE.repeat_last_n,
                repeat_penalty:
                    data.options?.repeat_penalty ||
                    OPTIONS_DEFAULT_VALUE.repeat_penalty,
                temperature:
                    data.options?.temperature ||
                    OPTIONS_DEFAULT_VALUE.temperature,
                num_predict:
                    data.options?.num_predict ||
                    OPTIONS_DEFAULT_VALUE.num_predict,
                top_k: data.options?.top_k || OPTIONS_DEFAULT_VALUE.top_k,
                top_p: data.options?.top_p || OPTIONS_DEFAULT_VALUE.top_p,
                min_p: data.options?.min_p || OPTIONS_DEFAULT_VALUE.min_p,
            },
            created_at: new Date(),
        });
    };

    return {
        data: results,
        isFetching: fetching,
        error,
        connectionStatus,
        insert,
    };
}
