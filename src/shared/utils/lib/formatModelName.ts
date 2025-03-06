/**
 * There can be version information in the model name (:latest). Remove it for display.
 * TODO: Requires more testing to ensure that all model names are formatted correctly.
 * @param {string} name - Model name
 * @return {string} Formatted model name
 */
export function formatModelName(name: string): string {
    // Remove version information from model name (drop last element from the splitted array)
    return name.split(':').slice(0, -1).join(':');
}
