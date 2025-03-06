/**
 * External dependencies
 */
import type { ReactElement } from 'react';

/**
 * Shared dependencies
 */
import { useDocumentsDB } from '@/shared/hooks/useDB';

/**
 * FileUploader component
 * @return {ReactElement} FileUploader
 */
export default function FileUploader(): ReactElement {
    const { insertCSV } = useDocumentsDB();

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = e.target.files;

            for (let i = 0; i < files.length; i++) {
                await insertCSV(files[i]);
            }
        }
    };

    return (
        <>
            <div className="input-group">
                <input
                    id="file"
                    type="file"
                    accept="text/csv"
                    multiple
                    onChange={handleFileChange}
                />
            </div>
        </>
    );
}
