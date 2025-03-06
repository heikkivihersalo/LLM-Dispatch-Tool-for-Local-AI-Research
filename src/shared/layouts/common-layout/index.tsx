/**
 * External dependencies
 */
import type { ReactElement } from 'react';

/**
 * Shared dependencies
 */
import LLMStatus from '@/features/llm-status';

/**
 * Internal dependencies
 */
import styles from './index.module.css';

/**
 * GuestLayout component
 * @param {PropsWithChildren} props
 * @param {React.ReactNode} props.children
 * @return {ReactElement} GuestLayout
 */
export default function CommonLayout({
    children,
    title,
}: {
    children: React.ReactNode | undefined;
    title: string;
}): ReactElement {
    return (
        <>
            <header className={styles.header}>
                <h1>{title}</h1>
            </header>
            <main>
                <div className={styles.container}>
                    <aside className={styles.sidebar}>
                        <ul className={styles.nav}>
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <a href="/settings">Settings</a>
                            </li>
                            <li>
                                <a href="/storage">Storage</a>
                            </li>
                        </ul>
                        <LLMStatus />
                    </aside>
                    {children}
                </div>
            </main>
        </>
    );
}
