/**
 * External dependencies
 *
 */
import type { ReactElement } from 'react';

/**
 * ModelTableHead component
 * @return {ReactElement} ModelTableHead
 */
export default function ModelVramSize({
    size,
}: {
    size: number;
}): ReactElement {
    const formatSize = (size: number): string => {
        if (size === 0) {
            return 'N/A';
        }
        return size.toString();
    };

    return <td>{formatSize(size)}</td>;
}
