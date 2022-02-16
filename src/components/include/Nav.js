import React, { useContext } from 'react';
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { MouseContext } from '../../context/mouse-context';

function Nav() {
    const { cursorChangeHandler } = useContext(MouseContext);

    const navigate = useNavigate();

    // 페이지 뒤로 가기
    function goBack() {
        navigate(-1);
    }

    // 페이지 앞으로 가기
    function goForward() {
        navigate(+1);
    }

    return (
        <div id="nav">
            <ul>
                <li onClick={goBack}
                    onMouseEnter={() => cursorChangeHandler("hovered")}
                    onMouseLeave={() => cursorChangeHandler("")}
                >
                    <AiOutlineLeft/>
                </li>
                <li onClick={goForward}
                    onMouseEnter={() => cursorChangeHandler("hovered")}
                    onMouseLeave={() => cursorChangeHandler("")}
                >
                    <AiOutlineRight/>
                </li>
            </ul>
        </div>
    );
}

export default Nav;