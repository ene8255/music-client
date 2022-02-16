import React from 'react';
import './skeleton.scss';
import PSkeletonTable from './PSkeletonTable';

function PlaylistSkeleton() {
    return (
        <main id='playlistSkeleton'>
            <section id='sList'>
                <div className='sImg sGray'></div>
                <div className='sTitle'>
                    <p className='sGray'></p>
                    <p className='sGray'></p>
                    <p className='sGray'></p>
                    <ul>
                        <li className='sGray'></li>
                        <li className='sGray'></li>
                    </ul>
                </div>
            </section>
            <PSkeletonTable />
        </main>
    );
}

export default PlaylistSkeleton;