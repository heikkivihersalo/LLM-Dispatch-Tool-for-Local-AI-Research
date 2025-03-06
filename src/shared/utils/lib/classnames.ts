/**
 * Joins classes together, filtering out any undefined values.
 * @param {string[]} classes - Array of classes to join
 * @return {string} Joined classes
 */
export function classnames(...classes: (string | undefined)[]): string {
    return classes.filter(Boolean).join(' ');
}
