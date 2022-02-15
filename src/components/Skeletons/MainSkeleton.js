import React from 'react';
import './skeleton.scss';

function MainSkeleton() {
    return (
        <main id="mainSkeleton">
            <div className='sGray'></div>
            <ul>
                <li>
                    <div className='sGray'></div>
                    <div>
                        <p className='sGray'></p>
                        <p className='sGray'></p>
                    </div>
                </li>
            </ul>
        </main>
    );
}

export default MainSkeleton;