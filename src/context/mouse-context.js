import React, { createContext, useState } from 'react';

// 커서 타입과 커서 타입 state를 업데이트하는 context 생성
export const MouseContext = createContext({
    cursorType: "",
    cursorChangeHandler: () => {}
});

function MouseContextProvider(props) {
    const [ cursorType, setCursorType ] = useState("");

    const cursorChangeHandler = (cursorType) => {
        setCursorType(cursorType);
    }

    return (
        <MouseContext.Provider
            value={{
                cursorType: cursorType,
                cursorChangeHandler: cursorChangeHandler
            }}
        >
            { props.children }
        </MouseContext.Provider>
    );
}

export default MouseContextProvider;