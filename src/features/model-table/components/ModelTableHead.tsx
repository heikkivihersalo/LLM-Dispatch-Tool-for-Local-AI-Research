/**
 * External dependencies
 *
 */
import type { ReactElement } from 'react';

/**
 * ModelTableHead component
 * @return {ReactElement} ModelTableHead
 */
export default function ModelTableHead(): ReactElement {
    return (
        <thead>
            <tr>
                <th>Name</th>
                <th>Parameter Size</th>
                <th>Size (vram)</th>
                <th>Running</th>
                <th>Actions</th>
            </tr>
        </thead>
    );
}
