import { type ClientSchema, Schema as S } from '@triplit/client';

/**
 * Define your schema here. After:
 * - Pass your schema to your Triplit client
 * - Push your schema to your Triplit server with 'triplit schema push'
 *
 * For more information about schemas, see the docs: https://www.triplit.dev/docs/schemas
 */

export const schema = {
    chat: {
        schema: S.Schema({
            id: S.Id(),
            model: S.String({
                enum: [
                    'deepseek-r1',
                    'deepseek-r1:671b',
                    'llama3.3',
                    'llama3.2',
                    'llama3.2:1b',
                    'llama3.2-vision',
                    'llama3.2-vision:90b',
                    'llama3.1',
                    'llama3.1:405b',
                    'phi4',
                    'phi3',
                    'gemma2:2b',
                    'gemma2',
                    'gemma2:27b',
                    'mistral',
                    'moondream',
                    'neural-chat',
                    'starling-lm',
                    'codellama',
                    'llama2-uncensored',
                    'llava',
                    'solar',
                ] as const,
            }),
            messages: S.String(),
            stream: S.Boolean(),
            keep_alive: S.Optional(S.Number()),
            tools: S.Optional(S.String()),
            options: S.Optional(
                S.Record({
                    mirostat: S.Number(),
                    mirostat_eta: S.Number(),
                    mirostat_tau: S.Number(),
                    num_ctx: S.Number(),
                    repeat_last_n: S.Number(),
                    repeat_penalty: S.Number(),
                    temperature: S.Number(),
                    seed: S.Optional(S.Number()),
                    stop: S.Optional(S.Set(S.String())),
                    num_predict: S.Number(),
                    top_k: S.Number(),
                    top_p: S.Number(),
                    min_p: S.Number(),
                })
            ),
            created_at: S.Date(),
            updated_at: S.Optional(S.Date()),
        }),
    },
    documents: {
        schema: S.Schema({
            id: S.Id(),
            name: S.String(),
            content: S.Set(S.String()), // Splitted documents for embedding model
            created_at: S.Date(),
        }),
    },
} satisfies ClientSchema;
