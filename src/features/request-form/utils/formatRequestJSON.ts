import type {
    ChatModel,
    ChatOptions,
    ChatMessage,
    ChatFormat,
} from '@/shared/types/ollama/chat';

type Props = {
    model: ChatModel;
    systemMessage: ChatMessage;
    userMessage: ChatMessage;
    format: ChatFormat;
    stream?: boolean;
    options: ChatOptions;
};

export default function formatRequestJSON({
    model,
    systemMessage,
    userMessage,
    options,
    format,
    stream = false,
}: Props): string {
    const requestObject = {
        model: model,
        messages: [
            { role: systemMessage.role, content: systemMessage.content },
            { ...userMessage },
        ],
        stream: stream,
        ...(Object.keys(format).length > 0
            ? {
                  format: format,
              }
            : {}), // If format object is not empty, add it to the request object
        options: { ...options },
    };

    return JSON.stringify(requestObject, null, 4);
}
