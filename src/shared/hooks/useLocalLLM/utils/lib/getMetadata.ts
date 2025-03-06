import {
    API_BASE_URL,
    API_ENDPOINTS,
    EMBEDDING_MODELS,
} from '@/shared/constants/ollama';

import { formatModelName } from '@/shared/utils/';

import type {
    ModelType,
    LocalModel,
    RunningModel,
    HydratedModel,
} from '@/shared/types/ollama/models';

/**
 * Get tags for a given model
 * @param {LocalModel} model - Model
 * @return {ModelType[]} Tags
 */
const getModelType = (model: LocalModel) => {
    const tags = [] as ModelType[];

    const name = formatModelName(model.name);

    // Check if the model is an embedding model
    if (
        EMBEDDING_MODELS.some((embeddingModel) => embeddingModel.name === name)
    ) {
        tags.push('embedding');
    } else {
        tags.push('llm');
    }

    return tags;
};

/**
 * Get LLM meta information
 * - Version
 * - Available AI models
 * - Active status
 * @return {Promise<{ version: string, models: HydratedModel[] }>}
 */
export async function getMetadata(type: ModelType): Promise<{
    version: string;
    models: HydratedModel[];
}> {
    const response = await Promise.allSettled([
        fetch(API_BASE_URL + API_ENDPOINTS.VERSION),
        fetch(API_BASE_URL + API_ENDPOINTS.LIST_LOCAL_MODELS),
        fetch(API_BASE_URL + API_ENDPOINTS.LIST_RUNNING_MODELS),
    ]);

    const [versionResponse, localModelsResponse, runningModelsResponse] =
        response;

    const version =
        versionResponse.status === 'fulfilled'
            ? (await versionResponse.value.json()).version
            : '';
    const localModels =
        localModelsResponse.status === 'fulfilled'
            ? (await localModelsResponse.value.json()).models
            : [];
    const runningModels =
        runningModelsResponse.status === 'fulfilled'
            ? (await runningModelsResponse.value.json()).models
            : [];

    const models: HydratedModel[] = localModels
        .map((model: LocalModel) => {
            const runningModel = runningModels.find(
                (runningModel: RunningModel) => runningModel.name === model.name
            );

            const modelType = getModelType(model);

            // Filter out different model types
            if (type !== 'all' && !modelType.includes(type)) {
                return null;
            }

            return {
                type: modelType,
                name: model.name,
                modified_at: model.modified_at,
                expires_at: runningModel?.expires_at || '',
                size: model.size,
                size_vram: runningModel?.size_vram || 0,
                digest: model.digest,
                details: {
                    format: model.details.format,
                    family: model.details.family,
                    families: model.details.families,
                    parent_model: runningModel?.details.parent_model || '',
                    parameter_size: model.details.parameter_size,
                    quantization_level: model.details.quantization_level,
                },
                running: Boolean(runningModel || false),
            };
        })
        .filter(Boolean);

    return {
        version,
        models,
    };
}
