import { useState, useEffect} from 'react';

function useMousePosition() {
    const [ mousePosition, setMousePosition ] = useState({ 
        x: null,
        y: null 
    });

    useEffect(() => {
        const mouseMoveHandler = (e) => {
            console.log(e);
            const { pageX, pageY } = e;
            console.log(pageX, pageY);
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