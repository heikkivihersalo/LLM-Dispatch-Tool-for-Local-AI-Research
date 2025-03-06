/**
 * External dependencies
 *
 */
import type { ReactElement } from 'react';

/**
 * Internal dependencies
 */
import { formatModelName } from '@/shared/utils';

/**
 * ModelTableHead component
 * @return {ReactElement} ModelTableHead
 */
export default function ModelName({ name }: { name: string }): ReactElement {
    return <td>{formatModelName(name)}</td>;
}
