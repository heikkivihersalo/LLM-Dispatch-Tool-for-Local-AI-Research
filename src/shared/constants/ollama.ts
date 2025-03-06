export const API_BASE_URL = 'http://localhost:11434';

export const API_ENDPOINTS = {
    VERSION:
        '/api/version' /** @link https://github.com/ollama/ollama/blob/main/docs/api.md#version */,
    LIST_LOCAL_MODELS:
        '/api/tags' /** @link https://github.com/ollama/ollama/blob/main/docs/api.md#list-local-models */,
    LIST_RUNNING_MODELS:
        '/api/ps' /** @link https://github.com/ollama/ollama/blob/main/docs/api.md#list-running-models*/,
    SHOW_MODEL_INFORMATION:
        '/api/show' /** @link https://github.com/ollama/ollama/blob/main/docs/api.md#show-model-information */,
    PULL_MODEL:
        '/api/pull' /** @link https://github.com/ollama/ollama/blob/main/docs/api.md#pull-a-model */,
    DELETE_MODEL:
        '/api/remove' /** @link https://github.com/ollama/ollama/blob/main/docs/api.md#delete-a-model */,
    CHAT: '/api/chat' /** @link https://github.com/ollama/ollama/blob/main/docs/api.md#generate-a-chat-completion */,
    GENERATE_COMPLETION:
        '/api/generate' /** @link https://github.com/ollama/ollama/blob/main/docs/api.md#generate-a-completion */,
};

export const EMBEDDING_MODELS = [
    {
        name: 'nomic-embed-text',
        excerpt:
            'A high-performing open embedding model with a large token context window.',
        description:
            'nomic-embed-text is a large context length text encoder that surpasses OpenAI text-embedding-ada-002 and text-embedding-3-small performance on short and long context tasks.',
        link: 'https://ollama.com/library/nomic-embed-text',
    },
    {
        name: 'mxbai-embed-large',
        excerpt: 'State-of-the-art large embedding model from mixedbread.ai',
        description:
            'As of March 2024, this model archives SOTA performance for Bert-large sized models on the MTEB. It outperforms commercial models like OpenAIs text-embedding-3-large model and matches the performance of model 20x its size. \n\nmxbai-embed-large was trained with no overlap of the MTEB data, which indicates that the model generalizes well across several domains, tasks and text length.',
        link: 'https://ollama.com/library/mxbai-embed-large',
    },
    {
        name: 'snowflake-arctic-embed',
        excerpt:
            'A suite of text embedding models by Snowflake, optimized for performance.',
        description:
            'snowflake-arctic-embed is a suite of text embedding models that focuses on creating high-quality retrieval models optimized for performance.\n\nThe models are trained by leveraging existing open-source text representation models, such as bert-base-uncased, and are trained in a multi-stage pipeline to optimize their retrieval performance.',
        link: 'https://ollama.com/library/snowflake-arctic-embed',
    },
    {
        name: 'bge-m3',
        excerpt:
            'BGE-M3 is a new model from BAAI distinguished for its versatility in Multi-Functionality, Multi-Linguality, and Multi-Granularity.',
        description: '',
        link: 'https://ollama.com/library/bge-m3',
    },
    {
        name: 'all-minilm',
        excerpt: 'Embedding models on very large sentence level datasets.',
        description: '',
        link: 'https://ollama.com/library/all-minilm',
    },
    {
        name: 'bge-large',
        excerpt: 'Embedding model from BAAI mapping texts to vectors.',
        description: '',
        link: 'https://ollama.com/library/bge-large',
    },
    {
        name: 'paraphrase-multilingual',
        excerpt:
            'Sentence-transformers model that can be used for tasks like clustering or semantic search.',
        description: '',
        link: 'https://ollama.com/library/paraphrase-multilingual',
    },
    {
        name: 'snowflake-arctic-embed2',
        excerpt:
            "Snowflake's frontier embedding model. Arctic Embed 2.0 adds multilingual support without sacrificing English performance or scalability.",
        description:
            'Snowflake is excited to announce the release of Arctic Embed 2.0, the next iteration of our frontier embedding models, which now empower multilingual search. While our previous releases have been well received by our customers, partners and the open source community, leading to millions of downloads, we have consistently received one request: Can you make this model multilingual? Arctic Embed 2.0 builds on the robust foundation of our previous releases, adding multilingual support without sacrificing English performance or scalability, to address the needs of an even broader user base that spans a wide range of languages and applications.',
        link: 'https://ollama.com/library/snowflake-arctic-embed2',
    },
    {
        name: 'granite-embedding',
        excerpt:
            'The IBM Granite Embedding 30M and 278M models models are text-only dense biencoder embedding models, with 30M available in English only and 278M serving multilingual use cases.',
        description:
            'The IBM Granite Embedding 30M and 278M models are text-only dense biencoder embedding models, with 30M available in English only and 278M serving multilingual use cases. These models are designed to produce fixed length vector representations for a given text chunk, which can be used for text similarity, retrieval, and search applications.',
        link: 'https://ollama.com/library/granite-embedding',
    },
];
