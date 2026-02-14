import { Suspense } from 'react';
import TrackOrder from './trackorder';

export default function Page() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center">
                    Loading...
                </div>
            }
        >
            <TrackOrder />
        </Suspense>
    );
}
