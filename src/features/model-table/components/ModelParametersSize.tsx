/**
 * External dependencies
 *
 */
import type { ReactElement } from 'react';

/**
 * ModelTableHead component
 * @return {ReactElement} ModelTableHead
 */
export default function ModelParametersSize({
    size,
}: {
    size: string;
}): ReactElement {
    return <td>{size}</td>;
}
