/**
 * External dependencies
 */
import type { ReactElement } from 'react';

/**
 * Shared dependencies
 */
import { classnames } from '@/shared/utils';

/**
 * Internal dependencies
 */
import styles from './button.module.css';

type Button = {
    children: React.ReactNode;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    testid?: string;
    isLoading?: boolean;
    onClick: () => void;
};

/**
 * Button component
 * @param {Object} props - Button props
 * @param {ReactNode} props.children - Button children
 * @param {string} [props.className] - Button class name
 * @param {string} [props.type] - Button type
 * @param {boolean} [props.disabled] - Button disabled state
 * @param {string} [props.testid] - Button test id
 * @param {Function} props.onClick - Button click handler
 * @return {ReactElement} Button
 */
export default function Button({
    children,
    onClick,
    className = '',
    disabled = false,
    type = 'button',
    testid = '',
    isLoading = false,
    ...props
}: Button): ReactElement {
    return (
        <button
            type={type}
            onClick={onClick}
            className={classnames(styles.button, className)}
            disabled={disabled}
            data-test-id={testid}
            {...props}
        >
            {isLoading ? 'Loading...' : children}
        </button>
    );
}
