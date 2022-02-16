import React, { useContext } from 'react';
import './cursor.scss';
import useMousePosition from '../../hooks/useMousePosition';
import { MouseContext } from '../../context/mouse-context';

function Cursor() {
    const { cursorType, cursorChangeHandler } = useContext(MouseContext);

    const { x, y } = useMousePosition();

    return (
        <div className={'cursor ' + cursorType} style={{ left: `${x}px`, top: `${y}px` }}>
        </div>
    );
}

export default Cursor;