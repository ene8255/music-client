import { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { MouseContext } from './context/mouse-context';

function Restoration() {
    const { pathname } = useLocation();

    const { cursorChangeHandler } = useContext(MouseContext);

    useEffect(() => {
        // 페이지 이동시 스크롤이 0으로 초기화 되도록 설정함
        window.scrollTo(0, 0);

        // 페이지 이동시 마우스 커서 크기를 원래대로 되돌림
        cursorChangeHandler("");
    }, [pathname]);

    return null;
}

export default Restoration;