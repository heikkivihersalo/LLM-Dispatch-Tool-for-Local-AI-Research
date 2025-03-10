/**
 * External dependencies
 */
import type { ReactElement } from 'react';

/**
 * LoadingSpinner component
 * @param {Object} props
 * @param {string} [props.className=''] - The class name to apply to the spinner
 * @return {ReactElement} LoadingSpinner
 */
export default function LoadingSpinner({
    className = '',
}: {
    className?: string;
}): ReactElement {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
        >
            <style>
                {'@keyframes spinner_KYSC{to{transform:rotate(360deg)}}'}
            </style>
            <path
                d="M12 4a8 8 0 0 1 7.89 6.7 1.53 1.53 0 0 0 1.49 1.3 1.5 1.5 0 0 0 1.48-1.75 11 11 0 0 0-21.72 0A1.5 1.5 0 0 0 2.62 12a1.53 1.53 0 0 0 1.49-1.3A8 8 0 0 1 12 4Z"
                style={{
                    transformOrigin: 'center',
                    animation: 'spinner_KYSC .75s infinite linear',
                }}
            />
        </svg>
    );
}
