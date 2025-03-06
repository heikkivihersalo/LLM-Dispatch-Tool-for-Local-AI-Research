export const REQUEST_SCHEMA = {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    $id: 'https://example.com/product.schema.json',
    title: 'Chat Request',
    description: "Request Schema for Ollama Chat Completion API's",
    type: 'object',
    properties: {
        model: {
            type: 'string',
            description: 'Model to use for chat completion',
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
            ],
            default: 'llama2',
        },
        messages: {
            type: 'array',
            description: 'Messages to use for chat completion',
            items: {
                type: 'object',
                properties: {
                    role: {
                        type: 'string',
                        enum: ['user', 'system', 'assistant', 'tool'],
                        description: 'Role of the message',
                        default: 'system',
                    },
                    content: {
                        type: 'string',
                        description: 'Content of the message',
                        default: 'System message',
                    },
                },
            },
        },
        stream: {
            type: 'boolean',
            description: 'Whether to stream the chat completion',
            default: false,
        },
        format: {
            type: 'object',
            description: 'Format of the response',
            properties: {
                type: {
                    type: 'string',
                    description: 'Type of the response format',
                },
                properties: {
                    type: 'object',
                    description: 'Properties of the response format',
                },
                required: {
                    type: 'array',
                    items: {
                        type: 'string',
                    },
                    description: 'Required properties in the response format',
                },
            },
        },
        options: {
            type: 'object',
            description: 'Options for the chat completion',
            properties: {
                mirostat: {
                    type: 'integer',
                    enum: [0, 1, 2],
                    default: 0,
                    description:
                        'Sets the mirostat mode. 0 = disabled, 1 = mirostat, 2 = mirostat with temperature. (Default: 0)',
                },
                mirostat_eta: {
                    type: 'number',
                    default: 0.1,
                    description:
                        'Influences how quickly the algorithm responds to feedback from the generated text. A lower learning rate will result in slower adjustments, while a higher learning rate will make the algorithm more responsive. (Default: 0.1)',
                },
                mirostat_tau: {
                    type: 'number',
                    default: 5.0,
                    description:
                        'Controls the balance between coherence and diversity of the output. A lower value will result in more focused and coherent text. (Default: 5.0)',
                },
                num_ctx: {
                    type: 'number',
                    default: 2048,
                    description:
                        'Sets the size of the context window used to generate the next token. (Default: 2048)',
                },
                repeat_last_n: {
                    type: 'number',
                    default: 64,
                    description:
                        'Sets how far back for the model to look back to prevent repetition. (Default: 64, 0 = disabled, -1 = num_ctx)',
                },
                repeat_penalty: {
                    type: 'number',
                    default: 1.1,
                    description:
                        'Sets how strongly to penalize repetitions. A higher value (e.g., 1.5) will penalize repetitions more strongly, while a lower value (e.g., 0.9) will be more lenient. (Default: 1.1)',
                },
                temperature: {
                    type: 'number',
                    default: 0.8,
                    description:
                        'The temperature of the model. Increasing the temperature will make the model answer more creatively. (Default: 0.8)',
                },
                seed: {
                    type: 'number',
                    description:
                        'Sets the random number seed to use for generation. Setting this to a specific number will make the model generate the same text for the same prompt. (Default: 0)',
                },
                stop: {
                    type: 'array',
                    description:
                        'Sets the stop sequences to use. When this pattern is encountered the LLM will stop generating text and return. Multiple stop patterns may be set by specifying multiple separate stop parameters in a modelfile.',
                    items: {
                        type: 'string',
                    },
                },
                num_predict: {
                    type: 'number',
                    default: -1,
                    description:
                        'Maximum number of tokens to predict when generating text. (Default: -1, infinite generation)',
                },
                top_k: {
                    type: 'number',
                    default: 40,
                    description:
                        'Reduces the probability of generating nonsense. A higher value (e.g. 100) will give more diverse answers, while a lower value (e.g. 10) will be more conservative. (Default: 40)',
                },
                top_p: {
                    type: 'number',
                    default: 0.9,
                    description:
                        'Works together with top-k. A higher value (e.g., 0.95) will lead to more diverse text, while a lower value (e.g., 0.5) will generate more focused and conservative text. (Default: 0.9)',
                },
                min_p: {
                    type: 'number',
                    default: 0.0,
                    description:
                        'Alternative to the top_p, and aims to ensure a balance of quality and variety. The parameter p represents the minimum probability for a token to be considered, relative to the probability of the most likely token. For example, with p=0.05 and the most likely token having a probability of 0.9, logits with a value less than 0.045 are filtered out. (Default: 0.0)',
                },
            },
        },
    },
    required: ['model', 'messages', 'stream', 'options'],
};
