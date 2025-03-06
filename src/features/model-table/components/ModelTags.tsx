/**
 * External dependencies
 *
 */
import type { ReactElement } from 'react';

/**
 * Internal dependencies
 */
import styles from './ModelTags.module.css';

/**
 * ModelTableHead component
 * @return {ReactElement} ModelTableHead
 */
export default function ModelTags({ tags }: { tags: string[] }): ReactElement {
    return (
        <td className={styles.tags}>
            {tags.map((tag, index) => (
                <span key={tag} className={styles.tag}>
                    {tag}
                    {index < tags.length - 1 ? ', ' : ''}
                </span>
            ))}
        </td>
    );
}
