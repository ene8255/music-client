import React from 'react';
import SkeletonList from './SkeletonList';
import './skeleton.scss';

function MainSkeleton() {
    return (
        <main id="mainSkeleton">
            <div className='sGray'></div>
            <ul>
                <SkeletonList />
                <SkeletonList />
                <SkeletonList />
                <SkeletonList />
            </ul>
            <div className='sGray'></div>
            <ul>
                <SkeletonList />
                <SkeletonList />
                <SkeletonList />
                <SkeletonList />
            </ul>
            <div className='sGray'></div>
            <ul>
                <SkeletonList />
                <SkeletonList />
                <SkeletonList />
                <SkeletonList />
            </ul>
        </main>
    );
}

export default MainSkeleton;