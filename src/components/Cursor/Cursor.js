import React, { useContext } from 'react';
import './cursor.scss';
import useMousePosition from '../../hooks/useMousePosition';
import { MouseContext } from '../../context/mouse-context';

// 페이지 마우스 커서의 위치에 따라 생성한 커서의 위치 변경
function Cursor() {
    // cursorType에 따라 생성한 커서의 클래스 이름 변경
    const { cursorType } = useContext(MouseContext);

    const { x, y } = useMousePosition();

    return (
        <div 
            className={'cursor ' + cursorType} 
            style={{ left: `${x}px`, top: `${y}px` }}
        >
        </div>
    );
}

export default Cursor;