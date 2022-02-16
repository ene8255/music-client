import React from 'react';
import MSkeletonSection from './MSkeletonSection';
import './skeleton.scss';

function MainSkeleton() {
    return (
        <main id="mainSkeleton">
            <MSkeletonSection />
            <MSkeletonSection />
            <MSkeletonSection />
        </main>
    );
}

export default MainSkeleton;