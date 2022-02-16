import React from 'react';

function MSkeletonList() {
    return (
        <li>
            <div className='sGray sImg'></div>
            <div>
                <p className='sGray sName'></p>
                <p className='sGray sDesc'></p>
            </div>
        </li>
    );
}

export default MSkeletonList;