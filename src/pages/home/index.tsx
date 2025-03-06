/**
 * External Dependencies
 */
import type { ReactElement } from 'react';

/**
 * Shared Dependencies
 */
import RequestForm from '@/features/request-form';
import CommonLayout from '@/shared/layouts/common-layout';

/**
 * Internal Dependencies
 */
import styles from './index.module.css';

/**
 * Home page component
 * @return {ReactElement} Home page
 */
export default function App(): ReactElement {
    return (
        <CommonLayout title="Home">
            <div className={styles.content} data-test-id="main-content">
                <RequestForm />
            </div>
        </CommonLayout>
    );
}
