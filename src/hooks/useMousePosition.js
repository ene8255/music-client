import { useState, useEffect} from 'react';

// 마우스 커서의 위치를 가져옴
function useMousePosition() {
    const [ mousePosition, setMousePosition ] = useState({ 
        x: null,
        y: null 
    });

    useEffect(() => {
        // 페이지에서 mousemove 이벤트가 일어날때마다 마우스 커서의 x, y 좌표를 가져옴
        const mouseMoveHandler = (e) => {
            const { pageX, pageY } = e;
            setMousePosition({ x: pageX, y: pageY });
        };
        document.addEventListener("mousemove", mouseMoveHandler);

        return () => {
            document.removeEventListener("mousemove", mouseMoveHandler);
        };
    }, []);

    return mousePosition;
}

export default useMousePosition;