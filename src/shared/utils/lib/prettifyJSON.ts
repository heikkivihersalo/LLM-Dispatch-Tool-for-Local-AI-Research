/**
 * Prettifies a JSON string.
 * @param {string} json - JSON string
 * @return {string | undefined} Prettified JSON string
 */
export function prettifyJSON(json: string): string {
    try {
        return JSON.stringify(JSON.parse(json), null, 4);
    } catch (e: unknown) {
        console.error('Error prettifying JSON:', e);
        return json; // Make sure to return the original JSON string if an error occurs, Codemirror will handle the error presentation to user
    }
}
