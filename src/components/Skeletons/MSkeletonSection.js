import React from 'react';
import MSkeletonList from './MSkeletonList';

function MSkeletonSection(props) {
    return (
        <>
            <div className='sGray'></div>
            <ul>
                <MSkeletonList />
                <MSkeletonList />
                <MSkeletonList />
                <MSkeletonList />
            </ul>
        </>
    );
}

export default MSkeletonSection;