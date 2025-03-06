import type { HydratedModel } from '@/shared/types/ollama/models';
import type { ChatConversationObject } from '@/shared/types/ollama/chat';

export type UseLocalLLM = {
    version: string;
    active: boolean;
    models: HydratedModel[];
    UIChunks: string[]; // Use this to create waterfall chat effect
    generate: (options: {
        body: ChatConversationObject;
        context?: string | null;
    }) => Promise<ChatConversationObject | undefined>;
    isLoading: boolean;
};
