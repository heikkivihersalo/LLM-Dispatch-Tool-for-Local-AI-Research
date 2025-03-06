export const MODEL_DEFAULT_VALUE = 'llama3.2';
export const MODEL_LOCAL_STORAGE_KEY = 'chat_model';

export const EMBEDDING_MODEL_LOCAL_STORAGE_KEY = 'chat_embedding_model';
export const EMBEDDING_MODEL_DEFAULT_VALUE = 'mxbai-embed-large';

export const CONTEXT_DEFAULT_VALUE = '';
export const CONTEXT_LOCAL_STORAGE_KEY = 'chat_context';

export const SYSTEM_MESSAGE_DEFAULT_VALUE = {
    role: 'system',
    content: 'You are an helpful assistant',
};
export const SYSTEM_MESSAGE_LOCAL_STORAGE_KEY = 'chat_system_message';

export const OPTIONS_DEFAULT_VALUE = {
    mirostat: 0,
    mirostat_eta: 0.1,
    mirostat_tau: 5.0,
    num_ctx: 2048,
    repeat_last_n: 64,
    repeat_penalty: 1.1,
    temperature: 0.8,
    num_predict: -1,
    top_k: 40,
    top_p: 0.9,
    min_p: 0.0,
};

export const OPTIONS_LOCAL_STORAGE_KEY = 'chat_options';

export const RESPONSE_FORMAT_LOCAL_STORAGE_KEY = 'chat_response_format';
export const RESPONSE_FORMAT_DEFAULT_VALUE = {};

export const USER_INPUT_LOCAL_STORAGE_KEY = 'chat_user_input';
export const USER_INPUT_DEFAULT_VALUE =
    '{"role":"user","content":"Write me a short story about dogs"}' as string;
