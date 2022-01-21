import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// 페이지 이동시 스크롤이 맨 위부터 다시 시작하도록 설정함
function ScrollRestoration() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

export default ScrollRestoration;