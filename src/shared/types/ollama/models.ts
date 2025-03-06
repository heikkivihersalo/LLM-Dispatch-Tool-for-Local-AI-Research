export type ModelFormat = 'gguf';
export type ModelFamily = 'llama';

export type ModelType = 'all' | 'embedding' | 'llm';

export type LocalModel = {
    name: string;
    modified_at: string;
    size: number;
    digest: string;
    details: {
        format: ModelFormat;
        family: ModelFamily[];
        families: string | null;
        parameter_size: string;
        quantization_level: string;
    };
};

export type RunningModel = {
    name: string;
    model: string;
    size: number;
    digest: string;
    details: {
        parent_model: string;
        format: ModelFormat;
        family: ModelFamily;
        families: ModelFamily[];
        parameter_size: string;
        quantization_level: string;
    };
    expires_at: string;
    size_vram: number;
};

export type ModelFile = {
    modelfile: string;
    parameters: string;
    template: string;
    details: {
        parent_model: string;
        format: ModelFormat;
        family: ModelFamily;
        families: string[];
        parameter_size: string;
        quantization_level: string;
    };
    model_info: {
        'general.architecture': string;
        'general.file_type': number;
        'general.parameter_count': number;
        'general.quantization_version': number;
        'llama.attention.head_count': number;
        'llama.attention.head_count_kv': number;
        'llama.attention.layer_norm_rms_epsilon': number;
        'llama.block_count': number;
        'llama.context_length': number;
        'llama.embedding_length': number;
        'llama.feed_forward_length': number;
        'llama.rope.dimension_count': number;
        'llama.rope.freq_base': number;
        'llama.vocab_size': number;
        'tokenizer.ggml.bos_token_id': number;
        'tokenizer.ggml.eos_token_id': number;
        'tokenizer.ggml.merges': unknown[];
        'tokenizer.ggml.model': string;
        'tokenizer.ggml.pre': string;
        'tokenizer.ggml.token_type': unknown[];
        'tokenizer.ggml.tokens': unknown[];
    };
};

export type HydratedModel = {
    type: ModelType[];
    name: string;
    modified_at: string;
    expires_at?: string;
    size: number;
    size_vram: number;
    digest: string;
    details: {
        format: ModelFormat;
        family: ModelFamily[];
        families: string[] | null;
        parent_model: string;
        parameter_size: string;
        quantization_level: string;
    };
    running: boolean;
    tags: string[];
};
