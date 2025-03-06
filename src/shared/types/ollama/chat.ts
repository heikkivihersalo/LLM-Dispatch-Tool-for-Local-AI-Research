/**
 * This file is a typescript declaration file for the Ollama Chat Completion API.
 *
 * @link https://github.com/ollama/ollama/blob/main/docs/api.md#generate-a-chat-completion
 */

export type ChatModel =
    | 'deepseek-r1'
    | 'deepseek-r1:671b'
    | 'llama3.3'
    | 'llama3.2'
    | 'llama3.2:1b'
    | 'llama3.2-vision'
    | 'llama3.2-vision:90b'
    | 'llama3.1'
    | 'llama3.1:405b'
    | 'phi4'
    | 'phi3'
    | 'gemma2:2b'
    | 'gemma2'
    | 'gemma2:27b'
    | 'mistral'
    | 'moondream'
    | 'neural-chat'
    | 'starling-lm'
    | 'codellama'
    | 'llama2-uncensored'
    | 'llava'
    | 'solar';

export type ChatMessageRole = 'system' | 'user' | 'assistant' | 'tool';

export type ChatMessage = {
    role: ChatMessageRole;
    content: string;
};

type ChatFormatPropertyType = {
    type: 'string' | 'boolean' | 'integer';
};

export type ChatFormat = {
    type: 'object';
    properties: Record<string, ChatFormatPropertyType>;
    required: string[];
};

export type ChatToolFunction = {
    type: string;
    function: {
        name: string;
        description: string;
        parameters: {
            type: string;
            properties: Record<string, unknown>;
            required: string[];
        };
    };
};

/**
 * @link https://github.com/ollama/ollama/blob/main/docs/modelfile.md#valid-parameters-and-values
 */
export type ChatOptions = {
    mirostat?: 0 | 1 | 2; // Sets the mirostat mode. 0 = disabled, 1 = mirostat, 2 = mirostat with temperature. (Default: 0)
    mirostat_eta?: number; // Influences how quickly the algorithm responds to feedback from the generated text. (Default: 0.1)
    mirostat_tau?: number; // Controls the balance between coherence and diversity of the output. (Default: 5.0)
    num_ctx?: number; // Sets the size of the context window used to generate the next token. (Default: 2048)
    repeat_last_n?: number; // Sets how far back for the model to look back to prevent repetition. (Default: 64)
    repeat_penalty?: number; // Sets how strongly to penalize repetitions. (Default: 1.1)
    temperature?: number; // The temperature of the model. (Default: 0.8)
    seed?: number; // Sets the random number seed to use for generation. (Default: 0)
    stop?: string[]; // Sets the stop sequences to use.
    num_predict?: number; // Maximum number of tokens to predict when generating text. (Default: -1)
    top_k?: number; // Reduces the probability of generating nonsense. (Default: 40)
    top_p?: number; // Works together with top-k. (Default: 0.9)
    min_p?: number; // Alternative to the top_p. (Default: 0.0)
};

export type ChatConversationObject = {
    model: ChatModel;
    messages: ChatMessage[];
    stream?: boolean;
    keep_alive?: number; // Used for a model to be unloaded from memory
    tools?: ChatToolFunction[];
    options?: ChatOptions;
};
