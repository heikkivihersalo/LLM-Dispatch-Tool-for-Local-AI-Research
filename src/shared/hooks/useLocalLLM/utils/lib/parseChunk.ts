/**
 * Parse the chunks of the message
 * @param chunk
 * @return {string} - The parsed chunk
 */
export function parseChunk(chunk: string): string {
    try {
        const parsedChunk = JSON.parse(chunk);
        return parsedChunk.message.content;
    } catch (e) {
        console.error('Error parsing chunk:', e);
    }

    return '';
}
