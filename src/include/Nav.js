import React from 'react';
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

function Nav() {
    const navigate = useNavigate();

    function goBack() {
        navigate(-1);
    }

    function goForward() {
        navigate(+1);
    }

    return (
        <div id="nav">
            <ul>
                <li onClick={goBack}><AiOutlineLeft/></li>
                <li onClick={goForward}><AiOutlineRight/></li>
            </ul>
        </div>
    );
}

export default Nav;