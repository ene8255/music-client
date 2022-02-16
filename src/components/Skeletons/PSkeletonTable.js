import React from 'react';
import './skeleton.scss';
import PSkeletonTr from './PSkeletonTr';

function PSkeletonTable() {
    return (
        <table id='sTable'>
            <thead>
                <tr>
                    <th>
                        <span className='sGray'></span>
                    </th>
                    <th>
                        <span className='sGray'></span>
                    </th>
                    <th>
                        <span className='sGray'></span>
                    </th>
                    <th>
                        <span className='sGray'></span>
                    </th>
                    <th>
                        <span className='sGray'></span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <PSkeletonTr />
                <PSkeletonTr />
                <PSkeletonTr />
                <PSkeletonTr />
                <PSkeletonTr />
                <PSkeletonTr />
                <PSkeletonTr />
                <PSkeletonTr />
                <PSkeletonTr />
                <PSkeletonTr />
            </tbody>
        </table>
    );
}

export default PSkeletonTable;